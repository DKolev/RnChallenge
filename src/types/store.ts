import { FilterOption } from './filters';
import { MapPin } from './components';

export enum AsyncStatus {
  Idle = 'idle',
  Loading = 'loading',
  Succeeded = 'succeeded',
  Failed = 'failed',
}

export interface FiltersState {
  // draft state
  draftConnectorTypes: FilterOption[];
  draftConnectorStatuses: FilterOption[];
  // applied state
  appliedConnectorTypes: FilterOption[];
  appliedConnectorStatuses: FilterOption[];
}

export interface PinsState {
  pins: MapPin[];
  status: AsyncStatus;
  error: string | null;
}
