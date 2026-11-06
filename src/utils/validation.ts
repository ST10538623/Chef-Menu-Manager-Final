import { Course, FormErrors } from '../types/menu';

const validCourses: Course[] = ['Starter', 'Main Course', 'Dessert'];

/**
 * Validates menu item form inputs.
 * Returns an object containing error messages for invalid fields.
 */
export const validateMenuItemForm = (
  name: string,
  description: string,
  course: Course | '',
  price: string
): FormErrors => {
  const errors: FormErrors = {};

  const trimmedName = name.trim();
  const trimmedDescription = description.trim();
  const trimmedPrice = price.trim();
  const numericPrice = Number(trimmedPrice);

  if (!trimmedName) {
    errors.name = 'Dish name is required.';
  }

  if (!trimmedDescription) {
    errors.description = 'Description is required.';
  }

  if (!course || !validCourses.includes(course)) {
    errors.course = 'Please select a course.';
  }

  if (!trimmedPrice) {
    errors.price = 'Price is required.';
  } else if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
    errors.price = 'Please enter a valid price greater than R0.00.';
  }

  return errors;
};
