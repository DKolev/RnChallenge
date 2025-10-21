import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';

import ScreenLayout from '../components/common/ScreenLayout';
import PinStyleItem from '../components/common/PinStyleItem';
import Button from '../components/common/Button';
import { STRINGS } from '../constants/strings';
import { COLORS } from '../constants/colors';
import { DEFAULT_PIN_STYLE, PIN_STYLES } from '../constants/pinStyles';
import { STORAGE_KEYS } from '../constants/storage';
import { storage } from '../storage/mmkv';

export default function SettingsScreen() {
  const navigation = useNavigation();
  const [pinStyles, setPinStyles] = useState(() => {
    // load from storage or use default
    const savedPinStyleId =
      storage.getString(STORAGE_KEYS.SELECTED_PIN_STYLE) || DEFAULT_PIN_STYLE;
    return PIN_STYLES.map(pinStyle => ({
      ...pinStyle,
      selected: pinStyle.id === savedPinStyleId,
    }));
  });

  const handlePinStyleSelect = (selectedId: string) => {
    setPinStyles(
      pinStyles.map(pinStyle => ({
        ...pinStyle,
        selected: pinStyle.id === selectedId,
      })),
    );
  };

  const handleApplySettings = () => {
    const selectedPinStyle = pinStyles.find(style => style.selected);
    storage.set(
      STORAGE_KEYS.SELECTED_PIN_STYLE,
      selectedPinStyle?.id || DEFAULT_PIN_STYLE,
    );
    console.log('Applying pin style:', selectedPinStyle);

    // close drawer and go back to home screen (previous screen)
    navigation.dispatch(DrawerActions.closeDrawer());
    navigation.goBack();
  };

  return (
    <ScreenLayout
      title={STRINGS.SETTINGS}
      showBackButton={true}
      showFilterButton={false}
    >
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>{STRINGS.PIN_STYLE}</Text>
        <Text style={styles.sectionDescription}>
          {STRINGS.PIN_STYLE_DESCRIPTION}
        </Text>

        <View style={styles.pinStyleList}>
          {pinStyles.map(pinStyle => (
            <PinStyleItem
              key={pinStyle.id}
              id={pinStyle.id}
              name={pinStyle.name}
              icon={pinStyle.icon}
              selected={pinStyle.selected}
              onSelect={handlePinStyleSelect}
            />
          ))}
        </View>

        <Button onPress={handleApplySettings} />
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 6,
  },
  sectionDescription: {
    fontSize: 15,
    color: COLORS.textSecondary,
    marginBottom: 20,
    lineHeight: 20,
  },
  pinStyleList: {
    gap: 8,
  },
});
