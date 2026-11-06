import { Course, FilterCourse, MenuItem } from '../types/menu';

export const COURSES: Course[] = ['Starter', 'Main Course', 'Dessert'];

export const FILTER_COURSES: FilterCourse[] = [
  'All',
  'Starter',
  'Main Course',
  'Dessert',
];

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Garlic Butter Bruschetta',
    description:
      'Grilled sourdough bread rubbed with garlic, topped with fresh vine tomatoes, basil, and balsamic reduction.',
    course: 'Starter',
    price: 65,
  },
  {
    id: '2',
    name: 'Grilled Ribeye Steak',
    description:
      'Tender 300g ribeye steak grilled with rosemary butter, served with truffle fries and peppercorn sauce.',
    course: 'Main Course',
    price: 220,
  },
  {
    id: '3',
    name: 'Decadent Chocolate Lava Cake',
    description:
      'Warm chocolate cake with a molten dark chocolate center, served with vanilla bean ice cream.',
    course: 'Dessert',
    price: 85,
  },
];
