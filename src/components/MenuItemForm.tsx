import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { COURSES } from '../constants/courses';
import { Course, FormErrors, MenuItem } from '../types/menu';
import { validateMenuItemForm } from '../utils/validation';

interface MenuItemFormProps {
  initialValues?: MenuItem;
  mode: 'add' | 'edit';
  onSave: (data: {
    name: string;
    description: string;
    course: Course;
    price: number;
  }) => void;
  onCancel: () => void;
}

export const MenuItemForm: React.FC<MenuItemFormProps> = ({
  initialValues,
  mode,
  onSave,
  onCancel,
}) => {
  const [dishName, setDishName] = useState(initialValues?.name ?? '');
  const [description, setDescription] = useState(initialValues?.description ?? '');
  const [course, setCourse] = useState<Course | ''>(initialValues?.course ?? '');
  const [price, setPrice] = useState(
    initialValues?.price !== undefined ? String(initialValues.price) : ''
  );

  const [errors, setErrors] = useState<FormErrors>({});

  const handleCourseChange = (selectedCourse: Course) => {
    setCourse(selectedCourse);
    setErrors((currentErrors) => ({
      ...currentErrors,
      course: undefined,
    }));
  };

  const handleSave = () => {
    const nextErrors = validateMenuItemForm(
      dishName,
      description,
      course,
      price
    );
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0 || !course) {
      return;
    }

    onSave({
      name: dishName.trim(),
      description: description.trim(),
      course: course,
      price: Number(price.trim()),
    });
  };

  const renderError = (message?: string) =>
    message ? <Text style={styles.errorText}>{message}</Text> : null;

  const isEditMode = mode === 'edit';

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.flex}
    >
      <ScrollView
        contentContainerStyle={styles.formContent}
        keyboardShouldPersistTaps="handled"
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back to dashboard"
          onPress={onCancel}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>‹ Back</Text>
        </Pressable>

        <Text style={styles.title}>
          {isEditMode ? 'EDIT MENU ITEM' : 'ADD MENU ITEM'}
        </Text>

        <Text style={styles.subtitle}>
          {isEditMode
            ? 'Update the details of your menu item below.'
            : 'Add a new dish to your restaurant menu.'}
        </Text>

        {/* Dish Name */}
        <View style={styles.formField}>
          <Text style={styles.label}>Dish Name</Text>
          <TextInput
            accessibilityLabel="Dish Name Input"
            autoCapitalize="words"
            onChangeText={(text) => {
              setDishName(text);
              if (errors.name) {
                setErrors((e) => ({ ...e, name: undefined }));
              }
            }}
            placeholder="Enter dish name"
            placeholderTextColor="#8A8A8A"
            style={[styles.input, errors.name && styles.inputError]}
            value={dishName}
          />
          {renderError(errors.name)}
        </View>

        {/* Description */}
        <View style={styles.formField}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            accessibilityLabel="Description Input"
            multiline
            onChangeText={(text) => {
              setDescription(text);
              if (errors.description) {
                setErrors((e) => ({ ...e, description: undefined }));
              }
            }}
            placeholder="Enter dish description"
            placeholderTextColor="#8A8A8A"
            style={[
              styles.input,
              styles.descriptionInput,
              errors.description && styles.inputError,
            ]}
            textAlignVertical="top"
            value={description}
          />
          {renderError(errors.description)}
        </View>

        {/* Course */}
        <View style={styles.formField}>
          <Text style={styles.label}>Course</Text>
          <Text style={styles.courseHelperText}>
            Select the course for this menu item
          </Text>

          <View style={styles.courseOptions}>
            {COURSES.map((courseOption) => {
              const isSelected = course === courseOption;

              return (
                <Pressable
                  key={courseOption}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                  accessibilityLabel={`Select ${courseOption}`}
                  onPress={() => handleCourseChange(courseOption)}
                  style={({ pressed }) => [
                    styles.courseOption,
                    isSelected && styles.courseOptionSelected,
                    errors.course && styles.courseOptionError,
                    pressed && styles.courseOptionPressed,
                  ]}
                >
                  <Text
                    style={[
                      styles.courseOptionText,
                      isSelected && styles.courseOptionTextSelected,
                    ]}
                  >
                    {courseOption}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {course ? (
            <View style={styles.selectedCourseContainer}>
              <Text style={styles.selectedCourseLabel}>Selected course:</Text>
              <Text style={styles.selectedCourse}>{course}</Text>
            </View>
          ) : null}

          {renderError(errors.course)}
        </View>

        {/* Price */}
        <View style={styles.formField}>
          <Text style={styles.label}>Price (R)</Text>
          <TextInput
            accessibilityLabel="Price Input in South African Rand"
            keyboardType="decimal-pad"
            onChangeText={(text) => {
              setPrice(text);
              if (errors.price) {
                setErrors((e) => ({ ...e, price: undefined }));
              }
            }}
            placeholder="Enter price (e.g. 75.00)"
            placeholderTextColor="#8A8A8A"
            style={[styles.input, errors.price && styles.inputError]}
            value={price}
          />
          {renderError(errors.price)}
        </View>

        {/* Save/Update Button */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={isEditMode ? 'Update Menu Item' : 'Save Menu Item'}
          onPress={handleSave}
          style={({ pressed }) => [
            styles.primaryButton,
            styles.saveButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.primaryButtonText}>
            {isEditMode ? 'Update Menu Item' : 'Save Menu Item'}
          </Text>
        </Pressable>

        {/* Cancel Button */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Cancel operation"
          onPress={onCancel}
          style={styles.cancelButton}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  formContent: {
    padding: 24,
    paddingBottom: 40,
  },
  title: {
    color: '#202020',
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: 0,
    marginBottom: 6,
  },
  subtitle: {
    color: '#666666',
    fontSize: 14,
    marginBottom: 24,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#263A35',
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    marginBottom: 28,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  backButton: {
    marginBottom: 20,
    alignSelf: 'flex-start',
    paddingVertical: 4,
  },
  backButtonText: {
    color: '#263A35',
    fontSize: 16,
    fontWeight: '600',
  },
  formField: {
    marginBottom: 18,
  },
  label: {
    color: '#303030',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  courseHelperText: {
    color: '#777777',
    fontSize: 12,
    marginBottom: 10,
  },
  courseOptions: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  courseOption: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E0E0E0',
    borderRadius: 12,
    borderWidth: 1,
    flex: 1,
    justifyContent: 'center',
    minHeight: 52,
    paddingHorizontal: 8,
  },
  courseOptionSelected: {
    backgroundColor: '#263A35',
    borderColor: '#263A35',
  },
  courseOptionError: {
    borderColor: '#B3261E',
  },
  courseOptionPressed: {
    opacity: 0.75,
  },
  courseOptionText: {
    color: '#303030',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  courseOptionTextSelected: {
    color: '#FFFFFF',
  },
  selectedCourseContainer: {
    alignItems: 'center',
    backgroundColor: '#F0F4F2',
    borderRadius: 10,
    flexDirection: 'row',
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  selectedCourseLabel: {
    color: '#666666',
    fontSize: 13,
    marginRight: 5,
  },
  selectedCourse: {
    color: '#263A35',
    fontSize: 13,
    fontWeight: '700',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E0E0E0',
    borderRadius: 12,
    borderWidth: 1,
    color: '#202020',
    fontSize: 15,
    minHeight: 52,
    paddingHorizontal: 14,
  },
  descriptionInput: {
    minHeight: 112,
    paddingTop: 14,
  },
  inputError: {
    borderColor: '#B3261E',
    borderWidth: 1,
  },
  errorText: {
    color: '#B3261E',
    fontSize: 13,
    marginTop: 6,
  },
  saveButton: {
    marginBottom: 12,
    marginTop: 8,
  },
  cancelButton: {
    alignItems: 'center',
    height: 48,
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: '#52645D',
    fontSize: 15,
    fontWeight: '600',
  },
});
