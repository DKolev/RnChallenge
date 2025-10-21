
import {
  MapPin,
  MapRegion,
  ConnectorType,
  ConnectorStatus,
} from '../../src/types/components';

export const mockRegion: MapRegion = {
  latitude: 40.7128,
  longitude: -74.006,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};

export const mockSmallRegion: MapRegion = {
  latitude: 40.7128,
  longitude: -74.006,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

export const mockLargeRegion: MapRegion = {
  latitude: 40.7128,
  longitude: -74.006,
  latitudeDelta: 0.5,
  longitudeDelta: 0.5,
};

export const mockPins: MapPin[] = [
  {
    _id: '1',
    title: 'Station A',
    latitude: 40.7128,
    longitude: -74.006,
    connectors: [
      { type: ConnectorType.J1772, status: ConnectorStatus.Available },
      { type: ConnectorType.Type2, status: ConnectorStatus.Available },
    ],
  },
  {
    _id: '2',
    title: 'Station B',
    latitude: 40.7228,
    longitude: -74.016,
    connectors: [
      { type: ConnectorType.Type2, status: ConnectorStatus.Unavailable },
    ],
  },
  {
    _id: '3',
    title: 'Station C',
    latitude: 40.7328,
    longitude: -74.026,
    connectors: [
      { type: ConnectorType.CCS2, status: ConnectorStatus.Available },
    ],
  },
];
