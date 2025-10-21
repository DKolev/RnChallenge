import { MapPin, ConnectorType, ConnectorStatus } from '../types/components';

export const sampleMarkers: MapPin[] = [
  {
    _id: '1',
    latitude: 37.78825,
    longitude: -122.4324,
    title: 'Charging Station 1',
    connectors: [
      { type: ConnectorType.Type2, status: ConnectorStatus.Available },
      { type: ConnectorType.CCS2, status: ConnectorStatus.Available },
      { type: ConnectorType.J1772, status: ConnectorStatus.Unavailable },
    ],
  },
  {
    _id: '2',
    latitude: 37.7849,
    longitude: -122.4194,
    title: 'Charging Station 2',
    connectors: [
      { type: ConnectorType.Type2, status: ConnectorStatus.Available },
      { type: ConnectorType.Type3, status: ConnectorStatus.Available },
    ],
  },
  {
    _id: '3',
    latitude: 37.4133,
    longitude: -122.0781,
    title: 'Charging Station 3',
    connectors: [
      { type: ConnectorType.CCS2, status: ConnectorStatus.Available },
      { type: ConnectorType.Type2, status: ConnectorStatus.Available },
      { type: ConnectorType.J1772, status: ConnectorStatus.Available },
    ],
  },
  {
    _id: '4',
    latitude: 37.4095,
    longitude: -122.0755,
    title: 'Charging Station 4',
    connectors: [
      { type: ConnectorType.Type2, status: ConnectorStatus.Unavailable },
      { type: ConnectorType.CCS2, status: ConnectorStatus.Available },
      { type: ConnectorType.Type3, status: ConnectorStatus.Available },
    ],
  },
  {
    _id: '5',
    latitude: 37.7786,
    longitude: -122.3893,
    title: 'Charging Station 5',
    connectors: [
      { type: ConnectorType.J1772, status: ConnectorStatus.Available },
      { type: ConnectorType.Type2, status: ConnectorStatus.Unavailable },
    ],
  },
];
