import React, { useMemo } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { useSelector } from 'react-redux';

import ScreenLayout from '../components/common/ScreenLayout';
import CustomMapView from '../components/common/MapView';
import { STRINGS } from '../constants/strings';
import { usePins } from '../hooks/usePins';
import { RootState } from '../store/store';
import { COLORS } from '../constants/colors';

export default function HomeScreen() {
  // get pins from server
  const { pins, isLoading, isError, error } = usePins();

  // get applied filter state from Redux
  const filterTypes = useSelector(
    (state: RootState) => state.filters.appliedConnectorTypes,
  );
  const filterStatuses = useSelector(
    (state: RootState) => state.filters.appliedConnectorStatuses,
  );

  // apply filters based on connector types and statuses
  const filteredMarkers = useMemo(() => {
    // useMemo to optimize filtering
    const checkedTypes = filterTypes
      .filter(type => type.checked)
      .map(type => type.id);
    const checkedStatuses = filterStatuses
      .filter(status => status.checked)
      .map(status => status.id);

    return pins.filter(marker =>
      marker.connectors.some(
        // at least one connector matches filters
        connector =>
          (!checkedTypes.length || checkedTypes.includes(connector.type)) &&
          (!checkedStatuses.length ||
            checkedStatuses.includes(connector.status)),
      ),
    );
  }, [pins, filterTypes, filterStatuses]);

  // handle loading and error states
  if (isLoading) {
    return (
      <ScreenLayout title={STRINGS.HOME} showFilterButton={false}>
        <View style={styles.centeredContainer}>
          <Text style={styles.loadingText}>{STRINGS.LOADING_PINS}</Text>
        </View>
      </ScreenLayout>
    );
  }

  if (isError) {
    return (
      <ScreenLayout title={STRINGS.HOME} showFilterButton={false}>
        <View style={styles.centeredContainer}>
          <Text style={styles.errorText}>
            {STRINGS.ERROR_LOADING_PINS} {error}
          </Text>
        </View>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title={STRINGS.HOME} showFilterButton={true}>
      <CustomMapView markers={filteredMarkers} />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.error,
    paddingHorizontal: 20,
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.text,
    paddingHorizontal: 20,
  },
});
