export const COLORS = {
  primary: '#1f6bc3ff',
  primaryAlpha: '#0038ee20',
  secondary: '#6c757d',
  white: '#FFFFFF',
  black: '#000000',
  error: '#dc3545',
  warning: '#ffc107',
  info: '#17a2b8',
  success: '#28a745',
  borderBottom: '#f8f9fa',
  background: '#ffffff',
  text: '#212529',
  textSecondary: '#6c757d',
} as const;

export type Colors = typeof COLORS;
