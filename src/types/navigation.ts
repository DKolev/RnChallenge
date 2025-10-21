import { CompositeNavigationProp } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

// menu drawer param list (left drawer with app screens)
export type MenuDrawerParamList = {
  Home: undefined;
  Settings: undefined;
};

// root navigator param list (right drawer with filters)
export type RootNavigatorParamList = {
  Main: undefined; // The main content (MenuDrawerNavigator)
};

// combined navigation prop type for components that need access to both drawers
export type AppNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<MenuDrawerParamList>,
  DrawerNavigationProp<RootNavigatorParamList>
>;
