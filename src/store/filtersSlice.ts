import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CONNECTOR_TYPES, CONNECTOR_STATUSES } from '../constants/filters';
import { FiltersState } from '../types/store';

const initialState: FiltersState = {
  draftConnectorTypes: CONNECTOR_TYPES,
  draftConnectorStatuses: CONNECTOR_STATUSES,
  appliedConnectorTypes: CONNECTOR_TYPES,
  appliedConnectorStatuses: CONNECTOR_STATUSES,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    // draft actions for ui in filter drawer
    toggleConnectorType: (state, action: PayloadAction<string>) => {
      const filter = state.draftConnectorTypes.find(
        type => type.id === action.payload,
      );
      if (filter) {
        filter.checked = !filter.checked;
      }
    },
    toggleConnectorStatus: (state, action: PayloadAction<string>) => {
      const filter = state.draftConnectorStatuses.find(
        status => status.id === action.payload,
      );
      if (filter) {
        filter.checked = !filter.checked;
      }
    },
    // clear all filters action
    clearAllFilters: state => {
      // clearing both draft and applied filters
      state.draftConnectorTypes.forEach(typeFilter => {
        typeFilter.checked = false;
      });
      state.draftConnectorStatuses.forEach(statusFilter => {
        statusFilter.checked = false;
      });
      state.appliedConnectorTypes.forEach(typeFilter => {
        typeFilter.checked = false;
      });
      state.appliedConnectorStatuses.forEach(statusFilter => {
        statusFilter.checked = false;
      });
    },
    // apply action - copy draft state to applied state (to update map)
    applyFilters: state => {
      state.appliedConnectorTypes = state.draftConnectorTypes.map(
        typeFilter => ({ ...typeFilter }),
      );
      state.appliedConnectorStatuses = state.draftConnectorStatuses.map(
        statusFilter => ({ ...statusFilter }),
      );
    },
  },
});

export const {
  toggleConnectorType,
  toggleConnectorStatus,
  clearAllFilters,
  applyFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
