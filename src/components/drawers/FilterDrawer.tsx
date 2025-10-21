import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { useSelector, useDispatch } from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome6';
import { COLORS } from '../../constants/colors';
import { STRINGS } from '../../constants/strings';
import { FilterOption } from '../../types/filters';
import Button from '../common/Button';
import {
  toggleConnectorType,
  toggleConnectorStatus,
  clearAllFilters,
  applyFilters,
} from '../../store/filtersSlice';
import { RootState, AppDispatch } from '../../store/store';

export default function FilterDrawer(props: DrawerContentComponentProps) {
  const dispatch = useDispatch<AppDispatch>();
  const filterTypes = useSelector(
    (state: RootState) => state.filters.draftConnectorTypes,
  );
  const filterStatuses = useSelector(
    (state: RootState) => state.filters.draftConnectorStatuses,
  );

  const toggleFilterType = (id: string) => {
    dispatch(toggleConnectorType(id));
  };

  const toggleFilterStatus = (id: string) => {
    dispatch(toggleConnectorStatus(id));
  };

  const renderFilterItems = (
    filters: FilterOption[],
    onToggle: (id: string) => void,
  ) => {
    return filters.map(filter => (
      <Pressable
        key={filter.id}
        style={styles.filterItem}
        onPress={() => onToggle(filter.id)}
      >
        <Icon
          name={filter.checked ? 'square-check' : 'square'}
          size={24}
          color={filter.checked ? COLORS.primary : COLORS.textSecondary}
          style={styles.checkbox}
        />
        <Text style={styles.filterLabel}>{filter.label}</Text>
      </Pressable>
    ));
  };

  const handleApplyFilters = () => {
    // apply the draft filters to the map (this triggers the re-render)
    dispatch(applyFilters());

    const activeFilterTypes = filterTypes.filter(
      (filter: FilterOption) => filter.checked,
    );
    const activeFilterStatuses = filterStatuses.filter(
      (filter: FilterOption) => filter.checked,
    );
    console.log('Applying filters:', activeFilterTypes, activeFilterStatuses);

    props.navigation.closeDrawer();
  };

  const handleClearFilters = () => {
    dispatch(clearAllFilters());
  };

  // used for enabling/disabling Apply button
  const hasActiveFilters =
    filterTypes.some(filter => filter.checked) ||
    filterStatuses.some(filter => filter.checked);

  return (
    <DrawerContentScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{STRINGS.FILTERS}</Text>
        <Pressable style={styles.clearButton} onPress={handleClearFilters}>
          <Icon name="filter-circle-xmark" size={18} color={COLORS.black} />
        </Pressable>
      </View>
      <View style={styles.content}>
        <Text style={styles.subtitle}>{STRINGS.CONNECTOR_TYPES}</Text>
        {renderFilterItems(filterTypes, toggleFilterType)}
        <Text style={styles.subtitle}>{STRINGS.CONNECTOR_STATUSES}</Text>
        {renderFilterItems(filterStatuses, toggleFilterStatus)}
        <Button
          onPress={handleApplyFilters}
          disabled={!hasActiveFilters}
        />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderBottom,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: COLORS.black,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.black,
    textAlign: 'center',
  },
  clearButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: COLORS.borderBottom,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
  },
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  checkbox: {
    marginRight: 12,
  },
  filterLabel: {
    fontSize: 16,
    color: COLORS.black,
  },
  applyButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginTop: 24,
    alignItems: 'center',
    alignSelf: 'center',
    minWidth: 120,
  },
  applyButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
