import React, { useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { EmptyState } from './src/components/EmptyState';
import { Header } from './src/components/Header';
import { MenuItemCard } from './src/components/MenuItemCard';
import { MenuItemForm } from './src/components/MenuItemForm';
import { SearchFilterBar } from './src/components/SearchFilterBar';
import { StatisticsCards } from './src/components/StatisticsCards';
import { INITIAL_MENU_ITEMS } from './src/constants/courses';
import { Course, FilterCourse, MenuItem, ScreenState } from './src/types/menu';
import { filterMenuItems } from './src/utils/filter';
import { calculateStatistics } from './src/utils/statistics';

const App: React.FC = () => {
  const [items, setItems] = useState<MenuItem[]>(INITIAL_MENU_ITEMS);
  const [screenState, setScreenState] = useState<ScreenState>({
    name: 'dashboard',
  });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterCourse, setFilterCourse] = useState<FilterCourse>('All');

  // Calculate overall menu statistics automatically from full menu items
  const statistics = useMemo(() => calculateStatistics(items), [items]);

  // Compute live search & filter results without modifying original items
  const filteredItems = useMemo(
    () => filterMenuItems(items, searchQuery, filterCourse),
    [items, searchQuery, filterCourse]
  );

  // Add menu item handler
  const handleAddItem = (data: {
    name: string;
    description: string;
    course: Course;
    price: number;
  }) => {
    const newItem: MenuItem = {
      id: `item_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name: data.name,
      description: data.description,
      course: data.course,
      price: data.price,
    };

    setItems((current) => [newItem, ...current]);
    setScreenState({ name: 'dashboard' });

    Alert.alert(
      'Menu Item Added',
      `"${newItem.name}" has been added to your menu successfully.`
    );
  };

  // Edit menu item handler
  const handleUpdateItem = (
    id: string,
    data: {
      name: string;
      description: string;
      course: Course;
      price: number;
    }
  ) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, ...data } : item
      )
    );
    setScreenState({ name: 'dashboard' });

    Alert.alert(
      'Menu Item Updated',
      `"${data.name}" has been updated successfully.`
    );
  };

  // Delete menu item handler
  const handleDeleteItem = (id: string, dishName: string) => {
    setItems((current) => current.filter((item) => item.id !== id));

    Alert.alert(
      'Menu Item Deleted',
      `"${dishName}" has been deleted from your menu.`
    );
  };

  // Clear search and course filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setFilterCourse('All');
  };

  const renderDashboard = () => (
    <FlatList
      contentContainerStyle={styles.dashboardContent}
      data={filteredItems}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <MenuItemCard
          item={item}
          onEdit={(targetItem) =>
            setScreenState({ name: 'edit', item: targetItem })
          }
          onDelete={handleDeleteItem}
        />
      )}
      ListHeaderComponent={
        <View style={styles.headerContainer}>
          <Header />

          {/* Add Menu Item Button */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Add new menu item"
            onPress={() => setScreenState({ name: 'add' })}
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.primaryButtonText}>+ Add Menu Item</Text>
          </Pressable>

          {/* Real-time Statistics Cards */}
          <StatisticsCards statistics={statistics} />

          {/* Search & Course Filter Controls */}
          {items.length > 0 && (
            <SearchFilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCourse={filterCourse}
              onSelectCourse={setFilterCourse}
              onClearFilters={handleClearFilters}
              filteredCount={filteredItems.length}
              totalCount={items.length}
            />
          )}

          {items.length > 0 && (
            <Text style={styles.sectionTitle}>
              Menu Items ({filteredItems.length})
            </Text>
          )}
        </View>
      }
      ListEmptyComponent={
        <EmptyState
          isSearchResult={items.length > 0}
          onActionPress={
            items.length > 0
              ? handleClearFilters
              : () => setScreenState({ name: 'add' })
          }
          actionText={
            items.length > 0 ? 'Clear Search & Filters' : '+ Add Menu Item'
          }
        />
      }
      ItemSeparatorComponent={() => <View style={styles.cardSeparator} />}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {screenState.name === 'dashboard' && renderDashboard()}

      {screenState.name === 'add' && (
        <MenuItemForm
          mode="add"
          onSave={handleAddItem}
          onCancel={() => setScreenState({ name: 'dashboard' })}
        />
      )}

      {screenState.name === 'edit' && (
        <MenuItemForm
          initialValues={screenState.item}
          mode="edit"
          onSave={(data) => handleUpdateItem(screenState.item.id, data)}
          onCancel={() => setScreenState({ name: 'dashboard' })}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#F8F8F8',
    flex: 1,
  },
  dashboardContent: {
    padding: 20,
    paddingBottom: 36,
  },
  headerContainer: {
    marginBottom: 8,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#263A35',
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  sectionTitle: {
    color: '#202020',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    marginTop: 4,
  },
  cardSeparator: {
    height: 12,
  },
});

export default App;
