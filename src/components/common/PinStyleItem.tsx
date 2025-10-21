import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { COLORS } from '../../constants/colors';
import { PinStyle } from '../../types/components';

export default function PinStyleItem({
  id,
  name,
  icon,
  selected,
  onSelect,
}: PinStyle) {
  return (
    <Pressable
      style={[styles.container, selected && styles.containerSelected]}
      onPress={() => onSelect?.(id)}
    >
      <Icon
        name={icon}
        size={20}
        color={selected ? COLORS.primary : COLORS.textSecondary}
        style={styles.icon}
      />

      <Text style={[styles.name, selected && styles.nameSelected]}>{name}</Text>

      <Icon
        name={selected ? 'check-circle' : 'circle'}
        size={18}
        color={selected ? COLORS.primary : COLORS.textSecondary}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.borderBottom,
  },
  containerSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryAlpha,
  },
  icon: {
    marginRight: 12,
  },
  name: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
  },
  nameSelected: {
    color: COLORS.primary,
  },
});
