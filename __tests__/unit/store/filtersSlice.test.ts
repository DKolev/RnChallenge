import reducer, {
  toggleConnectorType,
  toggleConnectorStatus,
  clearAllFilters,
  applyFilters,
} from '../../../src/store/filtersSlice';
import {
  CONNECTOR_TYPES,
  CONNECTOR_STATUSES,
} from '../../../src/constants/filters';
import { FiltersState } from '../../../src/types/store';

describe('filtersSlice', () => {
  const initialState: FiltersState = {
    draftConnectorTypes: CONNECTOR_TYPES,
    draftConnectorStatuses: CONNECTOR_STATUSES,
    appliedConnectorTypes: CONNECTOR_TYPES,
    appliedConnectorStatuses: CONNECTOR_STATUSES,
  };

  describe('toggleConnectorType', () => {
    it('should toggle connector type checked state', () => {
      const state = {
        ...initialState,
        draftConnectorTypes: [
          { id: 'J1772', label: 'J1772', checked: false },
          { id: 'Type 2', label: 'Type 2', checked: false },
        ],
      };

      const actual = reducer(state, toggleConnectorType('J1772'));
      expect(actual.draftConnectorTypes[0].checked).toBe(true);

      const toggledBack = reducer(actual, toggleConnectorType('J1772'));
      expect(toggledBack.draftConnectorTypes[0].checked).toBe(false);
    });
  });

  describe('toggleConnectorStatus', () => {
    it('should toggle connector status checked state', () => {
      const state = {
        ...initialState,
        draftConnectorStatuses: [
          { id: 'available', label: 'Available', checked: false },
        ],
      };

      const actual = reducer(state, toggleConnectorStatus('available'));
      expect(actual.draftConnectorStatuses[0].checked).toBe(true);
    });
  });

  describe('clearAllFilters', () => {
    it('should clear all filter selections', () => {
      const state = {
        ...initialState,
        draftConnectorTypes: [
          { id: 'J1772', label: 'J1772', checked: true },
          { id: 'Type 2', label: 'Type 2', checked: true },
        ],
        draftConnectorStatuses: [
          { id: 'available', label: 'Available', checked: true },
        ],
      };

      const actual = reducer(state, clearAllFilters());

      expect(actual.draftConnectorTypes.every(connectorType => !connectorType.checked)).toBe(true);
      expect(actual.draftConnectorStatuses.every(connectorStatus => !connectorStatus.checked)).toBe(true);
    });
  });

  describe('applyFilters', () => {
    it('should copy draft filters to applied filters', () => {
      const state = {
        ...initialState,
        draftConnectorTypes: [
          { id: 'J1772', label: 'J1772', checked: true },
          { id: 'Type 2', label: 'Type 2', checked: true },
        ],
        draftConnectorStatuses: [
          { id: 'available', label: 'Available', checked: true },
        ],
      };

      const actual = reducer(state, applyFilters());

      expect(actual.appliedConnectorTypes[0].checked).toBe(true);
      expect(actual.appliedConnectorTypes[1].checked).toBe(true);
      expect(actual.appliedConnectorStatuses[0].checked).toBe(true);
    });
  });

  describe('filter workflow', () => {
    it('should handle complete filter lifecycle', () => {
      let state = {
        ...initialState,
        draftConnectorTypes: [
          { id: 'J1772', label: 'J1772', checked: false },
          { id: 'Type 2', label: 'Type 2', checked: false },
        ],
        appliedConnectorTypes: [
          { id: 'J1772', label: 'J1772', checked: false },
          { id: 'Type 2', label: 'Type 2', checked: false },
        ],
      };

      // toggle filters
      state = reducer(state, toggleConnectorType('J1772'));
      state = reducer(state, toggleConnectorType('Type 2'));

      // apply
      state = reducer(state, applyFilters());
      expect(state.appliedConnectorTypes[0].checked).toBe(true);
      expect(state.appliedConnectorTypes[1].checked).toBe(true);

      // clear clears both draft AND applied
      state = reducer(state, clearAllFilters());
      expect(state.draftConnectorTypes[0].checked).toBe(false);
      expect(state.appliedConnectorTypes[0].checked).toBe(false);
    });
  });
});
