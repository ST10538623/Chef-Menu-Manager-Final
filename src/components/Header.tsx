import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'MENU MANAGER',
  subtitle = 'Manage your restaurant menu',
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    color: '#202020',
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: 0,
    marginBottom: 4,
  },
  subtitle: {
    color: '#666666',
    fontSize: 14,
  },
});
