export type Course = 'Starter' | 'Main Course' | 'Dessert';

export type FilterCourse = 'All' | Course;

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  course: Course;
  price: number;
};

export type FormErrors = {
  name?: string;
  description?: string;
  course?: string;
  price?: string;
};

export type MenuStatistics = {
  totalItems: number;
  averagePrice: number;
  starterCount: number;
  mainCount: number;
  dessertCount: number;
};

export type ScreenState =
  | { name: 'dashboard' }
  | { name: 'add' }
  | { name: 'edit'; item: MenuItem };
