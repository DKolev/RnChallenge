import { MapPin, MapRegion } from '../types/components';

export const filterMarkersInViewport = (
  markers: MapPin[],
  mapRegion: MapRegion,
): MapPin[] => {
  if (!mapRegion) return [];

  const {
    latitude: centerLat,
    longitude: centerLng,
    latitudeDelta,
    longitudeDelta,
  } = mapRegion;
  const halfLatDelta = latitudeDelta / 2;
  const halfLngDelta = longitudeDelta / 2;

  return markers.filter(marker => {
    // validate marker has coordinates
    if (!marker?.latitude || !marker?.longitude) return false;

    // check if marker is within viewport bounds
    const inLatBounds = Math.abs(marker.latitude - centerLat) <= halfLatDelta;
    const inLngBounds = Math.abs(marker.longitude - centerLng) <= halfLngDelta;

    return inLatBounds && inLngBounds;
  });
};
