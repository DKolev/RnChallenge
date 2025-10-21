import React from 'react';
import { StatusBar, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppBar } from '@react-native-material/core';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useNavigation, DrawerActions } from '@react-navigation/native';

import { CustomAppBarProps } from '../../types/components';
import { AppNavigationProp } from '../../types/navigation';
import { COLORS } from '../../constants/colors';

export default function CustomAppBar({
  title,
  showBackButton = false,
  showFilterButton = true,
  onBackPress,
}: CustomAppBarProps) {
  const navigation = useNavigation<AppNavigationProp>();

  const handleMenuPress = () => {
    if (showBackButton) {
      // for case with custom back handler, else go back
      if (onBackPress) {
        onBackPress();
      } else {
        navigation.goBack();
      }
    } else {
      navigation.dispatch(DrawerActions.toggleDrawer());
    }
  };

  const handleFilterPress = () => {
    const parent = navigation.getParent();
    if (parent) {
      parent.dispatch(DrawerActions.toggleDrawer());
    }
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <AppBar
        title={title}
        titleStyle={styles.title}
        centerTitle={true}
        leading={
          <Pressable onPress={handleMenuPress} style={styles.iconContainer}>
            <Icon
              name={showBackButton ? 'arrow-left' : 'bars'}
              size={24}
              color={COLORS.black}
            />
          </Pressable>
        }
        trailing={
          showFilterButton ? (
            <Pressable onPress={handleFilterPress} style={styles.iconContainer}>
              <Icon name="filter" size={24} color={COLORS.black} />
            </Pressable>
          ) : undefined
        }
        style={styles.appBar}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.white,
  },
  appBar: {
    backgroundColor: COLORS.white,
    elevation: 4,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: COLORS.black,
    fontSize: 20,
    fontWeight: '500',
  },
});
