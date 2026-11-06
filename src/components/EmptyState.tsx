import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface EmptyStateProps {
  isSearchResult?: boolean;
  onActionPress?: () => void;
  actionText?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  isSearchResult = false,
  onActionPress,
  actionText,
}) => {
  return (
    <View style={styles.emptyCard}>
      <Text style={styles.emptyTitle}>
        {isSearchResult
          ? 'No matching menu items found.'
          : 'No menu items have been added yet.'}
      </Text>

      <Text style={styles.emptyText}>
        {isSearchResult
          ? 'Try adjusting your search query or changing the course filter.'
          : 'Tap Add Menu Item to create your first dish.'}
      </Text>

      {onActionPress && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={
            actionText || (isSearchResult ? 'Reset Filters' : 'Add Menu Item')
          }
          onPress={onActionPress}
          style={({ pressed }) => [
            styles.actionButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.actionButtonText}>
            {actionText ||
              (isSearchResult ? 'Reset Search & Filter' : '+ Add Menu Item')}
          </Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginVertical: 12,
  },
  emptyTitle: {
    color: '#202020',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    color: '#666666',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    marginBottom: 16,
  },
  actionButton: {
    backgroundColor: '#263A35',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  buttonPressed: {
    opacity: 0.8,
  },
});
