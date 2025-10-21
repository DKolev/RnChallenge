import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import CustomAppBar from './CustomAppBar';
import { useRoute } from '@react-navigation/native';
import { ScreenLayoutProps } from '../../types/components';
import { COLORS } from '../../constants/colors';
import { STRINGS } from '../../constants/strings';
import { usePins } from '../../hooks/usePins';

export default function ScreenLayout({
  children,
  title,
  showBackButton = false,
  showFilterButton = true,
  onBackPress,
}: ScreenLayoutProps) {
  const route = useRoute();
  const screenTitle = title || route.name;
  const { isOnline } = usePins();
  const [showConnectionAlert, setShowConnectionAlert] = useState(false);

  // monitor network status and show alert accordingly
  useEffect(() => {
    if (!isOnline) {
      setShowConnectionAlert(true);
    } else {
      // hide alert after a delay when back online
      const timer = setTimeout(() => {
        setShowConnectionAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOnline]);

  const dismissOfflineAlert = () => {
    setShowConnectionAlert(false);
  };

  return (
    <View style={styles.container}>
      <CustomAppBar
        title={screenTitle}
        showBackButton={showBackButton}
        showFilterButton={showFilterButton}
        onBackPress={onBackPress}
      />
      {showConnectionAlert && (
        <View
          style={[
            styles.offlineAlert,
            { backgroundColor: isOnline ? COLORS.success : COLORS.error },
          ]}
        >
          <Text style={styles.offlineAlertText}>
            {!isOnline ? STRINGS.CONNECTION_LOST : STRINGS.CONNECTION_RESTORED}
          </Text>
          <TouchableOpacity onPress={dismissOfflineAlert}>
            <Text style={styles.dismissButtonText}>{STRINGS.DISMISS}</Text>
          </TouchableOpacity>
        </View>
      )}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  offlineAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  offlineAlertText: {
    flex: 1,
    color: COLORS.white,
  },
  dismissButtonText: {
    color: COLORS.white,
    marginLeft: 16,
  },
});
