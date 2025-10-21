import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import MenuDrawerNavigator from './MenuDrawerNavigator';
import FilterDrawerComponent from '../components/drawers/FilterDrawer';

// root navigator managing both drawers:
// - right drawer: Filters
// - left drawer: Main navigation (MenuDrawerNavigator)
const FilterDrawer = createDrawerNavigator();

// drawer content component for filters
const FilterDrawerContent = (props: DrawerContentComponentProps) => (
  <FilterDrawerComponent {...props} />
);

export function RootNavigator() {
  return (
    <FilterDrawer.Navigator
      screenOptions={{
        drawerPosition: 'right',
        headerShown: false,
        drawerStyle: {
          width: 280,
        },
      }}
      drawerContent={FilterDrawerContent}
    >
      <FilterDrawer.Screen name="Main" component={MenuDrawerNavigator} />
    </FilterDrawer.Navigator>
  );
}
