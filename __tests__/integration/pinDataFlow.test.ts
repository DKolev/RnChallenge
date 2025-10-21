import { configureStore } from '@reduxjs/toolkit';
import pinsReducer, { fetchPins, setPins } from '../../src/store/pinsSlice';
import filtersReducer, {
  toggleConnectorType,
  applyFilters,
} from '../../src/store/filtersSlice';
import { MapPin, ConnectorType } from '../../src/types/components';
import { AsyncStatus } from '../../src/types/store';
import { filterMarkersInViewport } from '../../src/utils/mapUtils';
import { mockPins, mockRegion } from '../mocks/mockData';

describe('Integration: Pin Data Flow', () => {
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

  it('should complete full data flow: API → Redux → Display with loading states', async () => {
    // step 1: initial idle state
    let state = store.getState().pins;
    expect(state.status).toBe(AsyncStatus.Idle);

    // step 2: mock API and fetch
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockPins),
    }) as any;

    const fetchPromise = store.dispatch(fetchPins() as any);

    // step 3: verify loading state
    state = store.getState().pins;
    expect(state.status).toBe(AsyncStatus.Loading);

    // step 4: wait for success and verify data
    await fetchPromise;
    state = store.getState().pins;
    expect(state.status).toBe(AsyncStatus.Succeeded);
    expect(state.pins).toEqual(mockPins);

    // step 5: verify map can filter by region
    const region = {
      latitude: 40.7128,
      longitude: -74.006,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    };
    const visiblePins = filterMarkersInViewport(state.pins, region);
    expect(visiblePins.length).toBeGreaterThan(0);
  });

  it('should handle network failure → retry → success', async () => {
    // initial fetch fails
    globalThis.fetch = jest.fn().mockRejectedValue(new Error('Network error')) as any;

    await store.dispatch(fetchPins() as any);
    let state = store.getState().pins;
    expect(state.status).toBe(AsyncStatus.Failed);
    expect(state.error).toBeTruthy();

    // retry succeeds
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockPins),
    }) as any;

    await store.dispatch(fetchPins() as any);
    state = store.getState().pins;
    expect(state.status).toBe(AsyncStatus.Succeeded);
    expect(state.pins).toEqual(mockPins);
  });

  it('should integrate pins with filters and map region', () => {
    // load pins
    store.dispatch(setPins(mockPins));

    // apply J1772 filter
    store.dispatch(toggleConnectorType('J1772'));
    store.dispatch(applyFilters());

    // get filtered pins
    const state = store.getState();
    const filteredPins = state.pins.pins.filter((pin: MapPin) =>
      pin.connectors.some(connector => connector.type === ConnectorType.J1772),
    );

    expect(filteredPins).toHaveLength(1); // only Station A has J1772
    expect(filteredPins.map((pin: MapPin) => pin._id)).toEqual(['1']);

    // apply region filter (map bounds)
    const visibleFilteredPins = filterMarkersInViewport(
      filteredPins,
      mockRegion,
    );
    expect(visibleFilteredPins).toHaveLength(1);
  });
});
