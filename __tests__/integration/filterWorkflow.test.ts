import { configureStore } from '@reduxjs/toolkit';
import filtersReducer, {
  toggleConnectorType,
  toggleConnectorStatus,
  clearAllFilters,
  applyFilters,
} from '../../src/store/filtersSlice';
import pinsReducer, { setPins } from '../../src/store/pinsSlice';
import {
  MapPin,
  ConnectorType,
  ConnectorStatus,
} from '../../src/types/components';
import { FilterOption } from '../../src/types/filters';
import { mockPins } from '../mocks/mockData';

describe('Integration: Filter Workflow', () => {
  type TestStore = ReturnType<typeof configureStore<{
    filters: ReturnType<typeof filtersReducer>;
    pins: ReturnType<typeof pinsReducer>;
  }>>;
  
  let store: TestStore;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        filters: filtersReducer,
        pins: pinsReducer,
      },
    });

    store.dispatch(setPins(mockPins));
  });

  it('should complete full filter workflow: select → apply → clear → verify', () => {
    // step 1: initial state - no filters
    let state = store.getState();
    expect(
      state.filters.appliedConnectorTypes.every((filter: FilterOption) => !filter.checked),
    ).toBe(true);
    expect(state.pins.pins).toHaveLength(3);

    // step 2: select filters (type + status)
    store.dispatch(toggleConnectorType('J1772'));
    store.dispatch(toggleConnectorStatus('available'));
    state = store.getState();

    // verify draft updated, but not applied yet
    expect(
      state.filters.draftConnectorTypes.find((filter: FilterOption) => filter.id === 'J1772')
        ?.checked,
    ).toBe(true);
    expect(
      state.filters.appliedConnectorTypes.find((filter: FilterOption) => filter.id === 'J1772')
        ?.checked,
    ).toBe(false);

    // step 3: apply filters
    store.dispatch(applyFilters());
    state = store.getState();

    // verify applied state updated
    expect(
      state.filters.appliedConnectorTypes.find((filter: FilterOption) => filter.id === 'J1772')
        ?.checked,
    ).toBe(true);
    expect(
      state.filters.appliedConnectorStatuses.find(
        (filter: FilterOption) => filter.id === 'available',
      )?.checked,
    ).toBe(true);

    // step 4: verify filtered results
    const filteredPins = state.pins.pins.filter((pin: MapPin) =>
      pin.connectors.some(
        connector =>
          connector.type === ConnectorType.J1772 &&
          connector.status === ConnectorStatus.Available,
      ),
    );
    expect(filteredPins).toHaveLength(1);
    expect(filteredPins[0]._id).toBe('1');

    // step 5: clear filters
    store.dispatch(clearAllFilters());
    state = store.getState();
    expect(
      state.filters.appliedConnectorTypes.every((filter: FilterOption) => !filter.checked),
    ).toBe(true);
  });

  it('should handle multiple filter types with OR logic', () => {
    // select multiple connector types
    store.dispatch(toggleConnectorType('J1772'));
    store.dispatch(toggleConnectorType('Type2'));
    store.dispatch(applyFilters());

    const state = store.getState();

    // filter pins by multiple types (OR logic)
    const filteredPins = state.pins.pins.filter((pin: MapPin) =>
      pin.connectors.some(
        connector => connector.type === ConnectorType.J1772 || connector.type === ConnectorType.Type2,
      ),
    );

    // stations 1 and 2 should match
    expect(filteredPins).toHaveLength(2);
    expect(filteredPins.map((pin: MapPin) => pin._id).sort()).toEqual(['1', '2']);
  });

  it('should combine type and status filters with AND logic', () => {
    // select Type2 AND Unavailable
    store.dispatch(toggleConnectorType('Type2'));
    store.dispatch(toggleConnectorStatus('unavailable'));
    store.dispatch(applyFilters());

    const state = store.getState();

    // filter with AND logic
    const filteredPins = state.pins.pins.filter((pin: MapPin) =>
      pin.connectors.some(
        connector =>
          connector.type === ConnectorType.Type2 &&
          connector.status === ConnectorStatus.Unavailable,
      ),
    );

    // only Station 2 matches
    expect(filteredPins).toHaveLength(1);
    expect(filteredPins[0]._id).toBe('2');
  });
});
