import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { RootState, AppDispatch } from '../store/store';
import { fetchPins, setPins } from '../store/pinsSlice';
import { storage } from '../storage/mmkv';
import { STORAGE_KEYS } from '../constants/storage';
import { AsyncStatus } from '../types/store';

export const usePins = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { pins, status, error } = useSelector((state: RootState) => state.pins);
  const [isOnline, setIsOnline] = useState(true);

  // Keep this as a regular function - simpler and avoids dependency issues
  const loadCachedPins = () => {
    try {
      const cachedData = storage.getString(STORAGE_KEYS.CACHED_PINS);
      if (cachedData) {
        const cachedPins = JSON.parse(cachedData);
        dispatch(setPins(cachedPins));
      }
    } catch (error) {
      console.warn('Error loading cached pins:', error);
    }
  };

  // set up network monitoring (once on mount)
  useEffect(() => {
    // possible issue with iOS simulator, couldn't test on real device
    const unsubscribe = NetInfo.addEventListener(state => {
      const connected = state.isConnected && state.isInternetReachable;
      const wasOffline = !isOnline;

      setIsOnline(connected ?? false);

      // refetch when connection is restored
      if (connected && wasOffline) {
        dispatch(fetchPins());
      }
    });

    return () => unsubscribe();
  }, [dispatch, isOnline]);

  // initial data loading
  useEffect(() => {
    if (status === AsyncStatus.Idle) {
      if (isOnline) {
        dispatch(fetchPins());
      } else {
        loadCachedPins();
      }
    }
  }, [dispatch, isOnline, status]);

  return {
    pins,
    isLoading: status === AsyncStatus.Loading,
    isError: status === AsyncStatus.Failed,
    error,
    isOnline,
  };
};
