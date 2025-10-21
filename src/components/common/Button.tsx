import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { ButtonProps } from '../../types/components';
import { STRINGS } from '../../constants/strings';

export default function Button({
  title = STRINGS.APPLY,
  onPress,
  disabled = false,
  style,
}: ButtonProps) {
  return (
    <Pressable
      style={[styles.button, disabled && styles.disabledButton, style]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[styles.buttonText, disabled && styles.disabledButtonText]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginTop: 24,
    alignItems: 'center',
    alignSelf: 'center',
    minWidth: 120,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: COLORS.secondary,
    opacity: 0.4,
  },
  disabledButtonText: {
    color: COLORS.black,
  },
});
