import React, { useEffect, useCallback, useState, useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MapView, { PROVIDER_GOOGLE, Callout, Region } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import useLocationPermission from '../../hooks/useLocationPermission';
import { CustomMapViewProps, ConnectorStatus } from '../../types/components';
import { COLORS } from '../../constants/colors';
import { DEFAULT_PIN_STYLE, PinStyleId } from '../../constants/pinStyles';
import { STORAGE_KEYS } from '../../constants/storage';
import { filterMarkersInViewport } from '../../utils/mapUtils';
import CustomMarker from './CustomMarker';
import { storage } from '../../storage/mmkv';
import { STRINGS } from '../../constants/strings';

// BUG: possible issue with showing default marker style when filter is applied (only Android)

// fallback to world view if location fetch fails
const FALLBACK_REGION: Region = {
  latitude: 20.0,
  longitude: 0.0,
  latitudeDelta: 100.0,
  longitudeDelta: 100.0,
};

// temporary test region
// const TEST_REGION: Region = {
//   latitude: 42.5,
//   longitude: 22.79,
//   latitudeDelta: 0.5,
//   longitudeDelta: 0.5,
// };

export default function CustomMapView({
  markers = [],
  style,
}: CustomMapViewProps) {
  const { hasPermission, requestPermission } = useLocationPermission();
  const [visibleMarkers, setVisibleMarkers] = useState(markers);
  const [selectedPinStyle, setSelectedPinStyle] =
    useState<PinStyleId>(DEFAULT_PIN_STYLE);
  const [initialRegion, setInitialRegion] = useState<Region | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const currentRegionRef = useRef<Region | null>(null);

  useEffect(() => {
    let mounted = true;

    const getLocation = async () => {
      try {
        // setCurrentRegion(TEST_REGION);
        // setIsLoading(false);
        // return;

        await requestPermission();

        Geolocation.getCurrentPosition(
          position => {
            if (!mounted) return;

            const { latitude, longitude } = position.coords;

            // setting user's current location as initial region
            const region = {
              latitude,
              longitude,
              latitudeDelta: 2.0, // to test wider view and see more pins - set to 2.0 / otherwise 0.05 for street level
              longitudeDelta: 2.0,
            };

            setInitialRegion(region);
            currentRegionRef.current = region;
            setIsLoading(false);
          },
          _error => {
            if (!mounted) return;
            setInitialRegion(FALLBACK_REGION);
            currentRegionRef.current = FALLBACK_REGION;
            setIsLoading(false);
          },
          { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 },
        );
      } catch {
        if (!mounted) return;
        setInitialRegion(FALLBACK_REGION);
        currentRegionRef.current = FALLBACK_REGION;
        setIsLoading(false);
      }
    };

    getLocation();

    return () => {
      mounted = false;
    };
  }, [requestPermission]);

  // update visible markers & filter by current viewport
  useEffect(() => {
    if (currentRegionRef.current) {
      const filtered = filterMarkersInViewport(
        markers,
        currentRegionRef.current,
      );
      setVisibleMarkers(filtered);
    } else {
      setVisibleMarkers(markers);
    }
  }, [markers, initialRegion]);

  useFocusEffect(
    useCallback(() => {
      const currentPinStyle =
        (storage.getString(STORAGE_KEYS.SELECTED_PIN_STYLE) as PinStyleId) ||
        DEFAULT_PIN_STYLE;
      if (currentPinStyle !== selectedPinStyle) {
        setSelectedPinStyle(currentPinStyle);
      }
    }, [selectedPinStyle])
  );

  const handleRegionChangeComplete = (region: Region) => {
    // when user moves the map, update current region & filter markers
    currentRegionRef.current = region;
    const filtered = filterMarkersInViewport(markers, region);
    setVisibleMarkers(filtered);
  };

  // show loading while getting location
  if (isLoading || !initialRegion) {
    return (
      <View style={[styles.container, style, styles.loadingContainer]}>
        <Text style={styles.loadingText}>{STRINGS.GETTING_USER_LOCATION}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <MapView
        key={`mapview-${selectedPinStyle}`}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}
        onRegionChangeComplete={handleRegionChangeComplete}
        showsUserLocation={hasPermission}
        showsMyLocationButton={hasPermission}
        zoomEnabled={true}
        scrollEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}
      >
        {visibleMarkers
          .filter(
            marker =>
              marker && marker._id && marker.latitude && marker.longitude,
          )
          .map(marker => (
            <CustomMarker
              key={marker._id}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              pinStyle={selectedPinStyle}
            >
              <Callout style={styles.callout}>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutTitle}>{marker.title}</Text>
                  <View style={styles.connectorsContainer}>
                    {marker.connectors.map((connector, index) => (
                      <View key={index} style={styles.connectorItem}>
                        <Text style={styles.connectorType}>
                          {connector.type}
                        </Text>
                        <Text
                          style={[
                            styles.connectorStatus,
                            connector.status === ConnectorStatus.Available
                              ? styles.statusAvailable
                              : styles.statusUnavailable,
                          ]}
                        >
                          {connector.status}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              </Callout>
            </CustomMarker>
          ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  callout: {
    minWidth: 200,
    minHeight: 100,
  },
  calloutContainer: {
    padding: 12,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    minWidth: 180,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  connectorsContainer: {
    gap: 4,
  },
  connectorItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 2,
  },
  connectorType: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  connectorStatus: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  statusAvailable: {
    color: COLORS.success,
  },
  statusUnavailable: {
    color: COLORS.error,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});
