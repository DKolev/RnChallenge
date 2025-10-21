export const STRINGS = {
  // navigation
  HOME: 'Home',
  SETTINGS: 'Settings',
  BACK: 'Back',

  // actions
  CANCEL: 'Cancel',
  APPLY: 'Apply',
  OK: 'OK',

  // messages
  LOADING: 'Loading...',
  GETTING_USER_LOCATION: 'Getting user location...',
  LOADING_PINS: 'Loading pins...',
  ERROR_LOADING_PINS: '! Error loading pins:',
  CONNECTION_LOST: 'Connection lost. Information may be outdated.',
  CONNECTION_RESTORED: 'Connection restored. Data updated.',
  DISMISS: '×',

  // filter related
  FILTERS: 'Filters',
  CONNECTOR_TYPES: 'Connector Types',
  CONNECTOR_STATUSES: 'Connector Statuses',
  CLEAR_FILTERS: 'Clear Filters',
  APPLY_FILTERS: 'Apply Filters',

  J1772: 'J1772',
  TYPE_2: 'Type 2',
  CCS_2: 'CCS 2',
  TYPE_3: 'Type 3',

  AVAILABLE: 'Available',
  UNAVAILABLE: 'Unavailable',

  // pin style related
  PIN_STYLE: 'Pin Style',
  PIN_STYLE_DESCRIPTION: 'Choose your preferred map pin style',
  DEFAULT_PIN: 'Default Pin',
  CIRCLE_PIN: 'Circle Pin',
  STAR_PIN: 'Star Pin',

  // location permission messages
  LOCATION_PERMISSION_REQUIRED: 'Location Permission Required',
  LOCATION_PERMISSION_IOS_MESSAGE:
    'This app needs location permissions to show your location on the map. Please enable location permissions in Settings > Privacy & Security > Location Services.',
  LOCATION_PERMISSION_ANDROID_MESSAGE:
    'This app needs location permissions to show your location on the map. If you previously denied with "Don\'t ask again", please enable location permissions in device settings.',
  ERROR_CHECKING_LOCATION_PERMISSIONS: 'Error checking location permissions:',
  LOCATION_PERMISSIONS_BLOCKED:
    'Location permissions blocked. Enable in device settings.',
  ERROR_REQUESTING_LOCATION_PERMISSIONS:
    'Error requesting location permissions:',

} as const;

export type StringKeys = keyof typeof STRINGS;
