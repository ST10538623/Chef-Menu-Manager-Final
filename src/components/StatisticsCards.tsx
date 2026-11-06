import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MenuStatistics } from '../types/menu';
import { formatCurrency } from '../utils/statistics';

interface StatisticsCardsProps {
  statistics: MenuStatistics;
}

export const StatisticsCards: React.FC<StatisticsCardsProps> = ({
  statistics,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Menu Overview & Statistics</Text>

      {/* Main summary row (Total & Average) */}
      <View style={styles.mainRow}>
        <View style={[styles.card, styles.primaryCard]}>
          <Text style={styles.primaryCardLabel}>Total Items</Text>
          <Text style={styles.primaryCardValue}>{statistics.totalItems}</Text>
        </View>

        <View style={[styles.card, styles.primaryCard]}>
          <Text style={styles.primaryCardLabel}>Average Price</Text>
          <Text style={styles.primaryCardValue}>
            {formatCurrency(statistics.averagePrice)}
          </Text>
        </View>
      </View>

      {/* Course counts breakdown row */}
      <View style={styles.courseRow}>
        <View style={[styles.card, styles.courseCard]}>
          <Text style={styles.courseCardValue}>{statistics.starterCount}</Text>
          <Text style={styles.courseCardLabel}>Starters</Text>
        </View>

        <View style={[styles.card, styles.courseCard]}>
          <Text style={styles.courseCardValue}>{statistics.mainCount}</Text>
          <Text style={styles.courseCardLabel}>Mains</Text>
        </View>

        <View style={[styles.card, styles.courseCard]}>
          <Text style={styles.courseCardValue}>{statistics.dessertCount}</Text>
          <Text style={styles.courseCardLabel}>Desserts</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#202020',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },
  mainRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
  },
  courseRow: {
    flexDirection: 'row',
    gap: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  primaryCard: {
    flex: 1,
    backgroundColor: '#263A35',
  },
  primaryCardLabel: {
    color: '#D2E0DA',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  primaryCardValue: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  courseCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderColor: '#E8EEEB',
    borderWidth: 1,
  },
  courseCardValue: {
    color: '#263A35',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  courseCardLabel: {
    color: '#666666',
    fontSize: 12,
    fontWeight: '600',
  },
});
