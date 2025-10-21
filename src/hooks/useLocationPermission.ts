import { useState, useEffect, useCallback } from 'react';
import { Platform, Alert } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { LocationPermissionResult } from '../types/hooks';
import { STRINGS } from '../constants/strings';

export default function useLocationPermission(): LocationPermissionResult {
  const [hasPermission, setHasPermission] = useState(false);

  const checkLocationPermission = useCallback(async (): Promise<boolean> => {
    try {
      if (Platform.OS === 'android') {
        const fineLocationStatus = await check(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );
        const coarseLocationStatus = await check(
          PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
        );

        return (
          fineLocationStatus === RESULTS.GRANTED &&
          coarseLocationStatus === RESULTS.GRANTED
        );
      } else if (Platform.OS === 'ios') {
        const locationStatus = await check(
          PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        );

        return locationStatus === RESULTS.GRANTED;
      }

      return true;
    } catch (error) {
      console.warn(STRINGS.ERROR_CHECKING_LOCATION_PERMISSIONS, error);
      return false;
    }
  }, []);

  const requestLocationPermission = useCallback(async (): Promise<boolean> => {
    try {
      if (Platform.OS === 'android') {
        const fineLocationResult = await request(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );
        const coarseLocationResult = await request(
          PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
        );

        const isBlocked =
          fineLocationResult === RESULTS.BLOCKED ||
          coarseLocationResult === RESULTS.BLOCKED;

        if (isBlocked) {
          console.warn(STRINGS.LOCATION_PERMISSIONS_BLOCKED);
        }

        return (
          fineLocationResult === RESULTS.GRANTED &&
          coarseLocationResult === RESULTS.GRANTED
        );
      } else if (Platform.OS === 'ios') {
        const locationResult = await request(
          PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        );

        if (locationResult === RESULTS.BLOCKED) {
          console.warn(STRINGS.LOCATION_PERMISSIONS_BLOCKED);
        }

        return locationResult === RESULTS.GRANTED;
      }

      return true;
    } catch (error) {
      console.warn(STRINGS.ERROR_REQUESTING_LOCATION_PERMISSIONS, error);
      return false;
    }
  }, []);

  const requestPermission = useCallback(async (): Promise<void> => {
    const currentPermission = await checkLocationPermission();

    if (currentPermission) {
      setHasPermission(true);
      return;
    }

    const granted = await requestLocationPermission();

    if (granted) {
      setHasPermission(true);
    } else {
      const message =
        Platform.OS === 'ios'
          ? STRINGS.LOCATION_PERMISSION_IOS_MESSAGE
          : STRINGS.LOCATION_PERMISSION_ANDROID_MESSAGE;

      Alert.alert(STRINGS.LOCATION_PERMISSION_REQUIRED, message, [
        { text: STRINGS.CANCEL, style: 'cancel' },
        { text: STRINGS.OK },
      ]);
    }
  }, [checkLocationPermission, requestLocationPermission]);

  useEffect(() => {
    const checkInitialPermission = async () => {
      const granted = await checkLocationPermission();
      setHasPermission(granted);
    };

    checkInitialPermission();
  }, [checkLocationPermission]);

  return {
    hasPermission,
    requestPermission,
  };
}
