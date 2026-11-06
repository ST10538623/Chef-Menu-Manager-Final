import { MenuItem, MenuStatistics } from '../types/menu';

/**
 * Calculates menu statistics automatically from the menu items array.
 * Prevents division-by-zero errors when the menu is empty.
 */
export const calculateStatistics = (items: MenuItem[]): MenuStatistics => {
  const validItems = items.filter(
    (item) => Number.isFinite(item.price) && item.price >= 0
  );
  const totalItems = validItems.length;

  if (totalItems === 0) {
    return {
      totalItems: 0,
      averagePrice: 0,
      starterCount: 0,
      mainCount: 0,
      dessertCount: 0,
    };
  }

  const totalPriceSum = validItems.reduce((sum, item) => sum + item.price, 0);
  const averagePrice = Number((totalPriceSum / totalItems).toFixed(2));

  const starterCount = validItems.filter((item) => item.course === 'Starter').length;
  const mainCount = validItems.filter((item) => item.course === 'Main Course').length;
  const dessertCount = validItems.filter((item) => item.course === 'Dessert').length;

  return {
    totalItems,
    averagePrice,
    starterCount,
    mainCount,
    dessertCount,
  };
};

/**
 * Formats a numeric price in South African Rand (R).
 * Example: 65 -> "R65.00"
 */
export const formatCurrency = (amount: number): string => {
  const safeAmount = Number.isFinite(amount) ? Math.max(0, amount) : 0;
  return `R${safeAmount.toFixed(2)}`;
};
