import { ReactNode } from 'react';
import { MapMarkerProps } from 'react-native-maps';
import { PinStyleId } from '../constants/pinStyles';

export interface ScreenLayoutProps {
  children: ReactNode;
  title?: string;
  showBackButton?: boolean;
  showFilterButton?: boolean;
  onBackPress?: () => void;
}

export interface CustomAppBarProps {
  title: string;
  showBackButton?: boolean;
  showFilterButton?: boolean;
  onBackPress?: () => void;
}

export interface MapRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export enum ConnectorType {
  J1772 = 'J1772',
  Type2 = 'Type 2',
  CCS2 = 'CCS 2',
  Type3 = 'Type 3',
}

export enum ConnectorStatus {
  Available = 'available',
  Unavailable = 'unavailable',
}

export interface Connector {
  type: ConnectorType;
  status: ConnectorStatus;
}

export interface MapPin {
  _id: string;
  title: string;
  latitude: number;
  longitude: number;
  connectors: Connector[];
}

export interface CustomMapViewProps {
  markers?: MapPin[];
  style?: any;
}

export interface PinStyle {
  id: string;
  name: string;
  icon: string;
  selected: boolean;
  onSelect?: (id: string) => void;
}

export interface CustomMarkerProps extends MapMarkerProps {
  pinStyle?: PinStyleId;
  size?: number;
  color?: string;
}

export interface ButtonProps {
  title?: string;
  onPress: () => void;
  disabled?: boolean;
  style?: any;
}
