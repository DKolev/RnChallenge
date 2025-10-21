import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome6';

import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { COLORS } from '../constants/colors';
import { STRINGS } from '../constants/strings';

const MenuDrawer = createDrawerNavigator();

// icon component for settings drawer item
const SettingsIcon = ({ color }: { color: string }) => (
  <Icon name="gear" size={20} color={color} />
);

export default function MenuDrawerNavigator() {
  return (
    <MenuDrawer.Navigator
      defaultStatus="closed"
      screenOptions={{
        drawerPosition: 'left',
        headerShown: false,
        drawerStyle: {
          backgroundColor: COLORS.white,
          width: 240,
        },
        drawerActiveBackgroundColor: COLORS.primaryAlpha,
        drawerActiveTintColor: COLORS.primary,
        drawerInactiveTintColor: COLORS.black,
        drawerType: 'front',
      }}
    >
      <MenuDrawer.Screen
        name={STRINGS.HOME}
        component={HomeScreen}
        options={{
          drawerItemStyle: { display: 'none' },
        }}
      />
      <MenuDrawer.Screen
        name={STRINGS.SETTINGS}
        component={SettingsScreen}
        options={{
          drawerLabel: STRINGS.SETTINGS,
          drawerIcon: SettingsIcon,
        }}
      />
    </MenuDrawer.Navigator>
  );
}
