export const STORAGE_KEYS = {
  SELECTED_PIN_STYLE: 'selectedPinStyle',
  CACHED_PINS: 'cached_pins',
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
