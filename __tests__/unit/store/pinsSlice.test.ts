import { configureStore } from '@reduxjs/toolkit';
import reducer, { fetchPins, setPins } from '../../../src/store/pinsSlice';
import { PinsState, AsyncStatus } from '../../../src/types/store';
import { mockPins } from '../../mocks/mockData';

const initialState: PinsState = {
  pins: [],
  status: AsyncStatus.Idle,
  error: null,
};

describe('pinsSlice', () => {
  type TestStore = ReturnType<typeof configureStore<{
    pins: PinsState;
  }>>;
  
  let store: TestStore;

  beforeEach(() => {
    store = configureStore({ reducer: { pins: reducer } });
    jest.clearAllMocks();
  });

  describe('fetchPins thunk lifecycle', () => {
    it('should handle pending state', () => {
      const state = reducer(initialState, fetchPins.pending('', undefined));
      expect(state.status).toBe(AsyncStatus.Loading);
      expect(state.error).toBeNull();
    });

    it('should handle fulfilled state', () => {
      const state = reducer(
        initialState,
        fetchPins.fulfilled(mockPins, '', undefined),
      );

      expect(state.status).toBe(AsyncStatus.Succeeded);
      expect(state.pins).toEqual(mockPins);
    });

    it('should handle rejected state', () => {
      const error = { message: 'Network error' };
      const state = reducer(
        initialState,
        fetchPins.rejected(error as any, '', undefined),
      );

      expect(state.status).toBe(AsyncStatus.Failed);
      expect(state.error).toBe('Network error');
    });
  });

  describe('fetchPins API integration', () => {
    it('should fetch pins successfully', async () => {
      globalThis.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockPins),
      }) as any;

      const result = await store.dispatch(fetchPins() as any);

      expect(result.type).toBe('pins/fetchPins/fulfilled');
      expect(result.payload).toEqual(mockPins);
    });
  });

  describe('setPins action', () => {
    it('should update pins state directly', () => {
      const state = reducer(initialState, setPins(mockPins));

      expect(state.pins).toEqual(mockPins);
      expect(state.status).toBe(AsyncStatus.Succeeded);
    });
  });
});
