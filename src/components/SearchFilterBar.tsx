import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { FILTER_COURSES } from '../constants/courses';
import { FilterCourse } from '../types/menu';

interface SearchFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCourse: FilterCourse;
  onSelectCourse: (course: FilterCourse) => void;
  onClearFilters: () => void;
  filteredCount: number;
  totalCount: number;
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCourse,
  onSelectCourse,
  onClearFilters,
  filteredCount,
  totalCount,
}) => {
  const isFilterActive = searchQuery.trim() !== '' || selectedCourse !== 'All';

  return (
    <View style={styles.container}>
      {/* Search Bar Input */}
      <View style={styles.searchContainer}>
        <TextInput
          accessibilityLabel="Search menu items by dish name"
          accessibilityHint="Type to search dishes"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={onSearchChange}
          placeholder="Search by dish name..."
          placeholderTextColor="#8A8A8A"
          style={styles.searchInput}
          value={searchQuery}
        />
        {searchQuery.length > 0 && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Clear search text"
            onPress={() => onSearchChange('')}
            style={styles.clearSearchInputButton}
          >
            <Text style={styles.clearSearchInputText}>✕</Text>
          </Pressable>
        )}
      </View>

      {/* Course Filter Chips */}
      <Text style={styles.filterLabel}>Filter by Course:</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterChipContainer}
      >
        {FILTER_COURSES.map((courseOption) => {
          const isSelected = selectedCourse === courseOption;
          return (
            <Pressable
              key={courseOption}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              accessibilityLabel={`Filter by ${courseOption}`}
              onPress={() => onSelectCourse(courseOption)}
              style={({ pressed }) => [
                styles.chip,
                isSelected && styles.chipSelected,
                pressed && styles.chipPressed,
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  isSelected && styles.chipTextSelected,
                ]}
              >
                {courseOption}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Active Filter Indicator & Reset Button */}
      {isFilterActive && (
        <View style={styles.activeFilterRow}>
          <Text style={styles.activeFilterText}>
            Showing {filteredCount} of {totalCount} items
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Clear search and filter"
            onPress={onClearFilters}
            style={({ pressed }) => [
              styles.clearFilterButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.clearFilterText}>Reset Search & Filter</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  searchContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E0E0E0',
    borderRadius: 12,
    borderWidth: 1,
    color: '#202020',
    fontSize: 15,
    minHeight: 48,
    paddingLeft: 14,
    paddingRight: 40,
  },
  clearSearchInputButton: {
    position: 'absolute',
    right: 12,
    top: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearSearchInputText: {
    color: '#555555',
    fontSize: 12,
    fontWeight: '700',
  },
  filterLabel: {
    color: '#666666',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  filterChipContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingBottom: 4,
  },
  chip: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E0E0E0',
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipSelected: {
    backgroundColor: '#263A35',
    borderColor: '#263A35',
  },
  chipPressed: {
    opacity: 0.8,
  },
  chipText: {
    color: '#303030',
    fontSize: 13,
    fontWeight: '600',
  },
  chipTextSelected: {
    color: '#FFFFFF',
  },
  activeFilterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 2,
  },
  activeFilterText: {
    color: '#666666',
    fontSize: 13,
    fontWeight: '500',
  },
  clearFilterButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  clearFilterText: {
    color: '#263A35',
    fontSize: 13,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  buttonPressed: {
    opacity: 0.7,
  },
});
