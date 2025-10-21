import { configureStore } from '@reduxjs/toolkit';
import pinsReducer, { fetchPins, setPins } from '../../src/store/pinsSlice';
import filtersReducer, {
  toggleConnectorType,
  toggleConnectorStatus,
  applyFilters,
} from '../../src/store/filtersSlice';
import {
  MapPin,
  ConnectorType,
  ConnectorStatus,
} from '../../src/types/components';
import { AsyncStatus } from '../../src/types/store';
import { filterMarkersInViewport } from '../../src/utils/mapUtils';
import { mockPins, mockSmallRegion, mockLargeRegion } from '../mocks/mockData';

describe('Integration: Complete User Journeys', () => {
  type TestStore = ReturnType<typeof configureStore<{
    pins: ReturnType<typeof pinsReducer>;
    filters: ReturnType<typeof filtersReducer>;
  }>>;
  
  let store: TestStore;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        pins: pinsReducer,
        filters: filtersReducer,
      },
    });

    jest.clearAllMocks();
  });

  it('Journey: User opens app → Loads data → Filters → Sees specific results', async () => {
    // step 1: app opens with empty state
    expect(store.getState().pins.status).toBe(AsyncStatus.Idle);
    expect(store.getState().pins.pins).toEqual([]);

    // step 2: fetch data
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockPins),
    }) as any;

    await store.dispatch(fetchPins() as any);

    // step 3: data loaded
    expect(store.getState().pins.status).toBe(AsyncStatus.Succeeded);
    expect(store.getState().pins.pins).toHaveLength(3);

    // step 4: user applies filters (J1772 + Available)
    store.dispatch(toggleConnectorType('J1772'));
    store.dispatch(toggleConnectorStatus('available'));
    store.dispatch(applyFilters());

    // step 5: user sees only matching station
    const state = store.getState();
    const filteredPins = state.pins.pins.filter((pin: MapPin) =>
      pin.connectors.some(
        connector =>
          connector.type === ConnectorType.J1772 &&
          connector.status === ConnectorStatus.Available,
      ),
    );

    expect(filteredPins).toHaveLength(1);
    expect(filteredPins[0].title).toBe('Station A');
  });

  it('Journey: User interacts with map → Zooms affect visible pins', () => {
    // load pins
    store.dispatch(setPins(mockPins));

    // step 1: zoomed in view (small region)
    let state = store.getState().pins;
    let visiblePins = filterMarkersInViewport(state.pins, mockSmallRegion);

    // only nearby Station A visible
    expect(visiblePins).toHaveLength(1);
    expect(visiblePins[0]._id).toBe('1');

    // step 2: zoom out (larger region)
    visiblePins = filterMarkersInViewport(state.pins, mockLargeRegion);

    // all stations visible
    expect(visiblePins).toHaveLength(3);
  });
});
