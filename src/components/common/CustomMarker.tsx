import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { COLORS } from '../../constants/colors';
import { PIN_STYLE_ICONS, PIN_STYLE_IDS } from '../../constants/pinStyles';
import { CustomMarkerProps } from '../../types/components';

export default function CustomMarker({
  pinStyle = PIN_STYLE_IDS.DEFAULT,
  size = 30,
  color = COLORS.error,
  children,
  ...markerProps
}: CustomMarkerProps) {
  const iconName =
    PIN_STYLE_ICONS[pinStyle] || PIN_STYLE_ICONS[PIN_STYLE_IDS.DEFAULT];

  return (
    <Marker {...markerProps}>
      <View style={styles.container}>
        <Icon name={iconName} size={size} color={color} style={styles.icon} />
      </View>
      {children}
    </Marker>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    textShadowColor: COLORS.white,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
