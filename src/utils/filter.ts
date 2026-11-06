import { FilterCourse, MenuItem } from '../types/menu';

/**
 * Filters menu items by dish name (case-insensitive) and course filter together.
 * Does NOT modify the original menu data array.
 */
export const filterMenuItems = (
  items: MenuItem[],
  searchQuery: string,
  filterCourse: FilterCourse
): MenuItem[] => {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return items.filter((item) => {
    const matchesSearch =
      normalizedQuery === '' ||
      item.name.toLowerCase().includes(normalizedQuery);

    const matchesCourse =
      filterCourse === 'All' || item.course === filterCourse;

    return matchesSearch && matchesCourse;
  });
};
