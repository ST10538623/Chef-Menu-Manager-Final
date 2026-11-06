import React from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { MenuItem } from '../types/menu';
import { formatCurrency } from '../utils/statistics';

interface MenuItemCardProps {
  item: MenuItem;
  onEdit: (item: MenuItem) => void;
  onDelete: (id: string, dishName: string) => void;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  onEdit,
  onDelete,
}) => {
  const handleDeletePress = () => {
    Alert.alert(
      'Delete Menu Item',
      `Are you sure you want to delete "${item.name}" from your menu?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDelete(item.id, item.name),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.menuCard}>
      <View style={styles.cardHeading}>
        <Text style={styles.dishName}>{item.name}</Text>
        <View style={styles.courseBadge}>
          <Text style={styles.courseBadgeText}>{item.course}</Text>
        </View>
      </View>

      <Text style={styles.description}>{item.description}</Text>

      <View style={styles.footerRow}>
        <Text style={styles.price}>{formatCurrency(item.price)}</Text>

        <View style={styles.actionButtons}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Edit ${item.name}`}
            onPress={() => onEdit(item)}
            style={({ pressed }) => [
              styles.actionButton,
              styles.editButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Delete ${item.name}`}
            onPress={handleDeletePress}
            style={({ pressed }) => [
              styles.actionButton,
              styles.deleteButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 18,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardHeading: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dishName: {
    color: '#202020',
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    marginRight: 12,
  },
  courseBadge: {
    backgroundColor: '#E8EEEB',
    borderRadius: 20,
    maxWidth: '45%',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  courseBadgeText: {
    color: '#263A35',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  description: {
    color: '#666666',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 14,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 12,
  },
  price: {
    color: '#202020',
    fontSize: 17,
    fontWeight: '700',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    minHeight: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#E8EEEB',
  },
  editButtonText: {
    color: '#263A35',
    fontSize: 13,
    fontWeight: '700',
  },
  deleteButton: {
    backgroundColor: '#FCE8E6',
  },
  deleteButtonText: {
    color: '#B3261E',
    fontSize: 13,
    fontWeight: '700',
  },
  buttonPressed: {
    opacity: 0.7,
  },
});
