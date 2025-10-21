import { ConnectorType, ConnectorStatus } from '../types/components';
import { FilterOption } from '../types/filters';
import { STRINGS } from './strings';

// connector types
export const CONNECTOR_TYPES: FilterOption[] = [
  { id: ConnectorType.J1772, label: STRINGS.J1772, checked: false },
  { id: ConnectorType.Type2, label: STRINGS.TYPE_2, checked: false },
  { id: ConnectorType.CCS2, label: STRINGS.CCS_2, checked: false },
  { id: ConnectorType.Type3, label: STRINGS.TYPE_3, checked: false },
];

// connector statuses
export const CONNECTOR_STATUSES: FilterOption[] = [
  { id: ConnectorStatus.Available, label: STRINGS.AVAILABLE, checked: false },
  {
    id: ConnectorStatus.Unavailable,
    label: STRINGS.UNAVAILABLE,
    checked: false,
  },
];
