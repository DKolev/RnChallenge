export interface LocationPermissionResult {
  hasPermission: boolean;
  requestPermission: () => Promise<void>;
}
