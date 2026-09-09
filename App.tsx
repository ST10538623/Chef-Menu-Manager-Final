import { useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type Course = 'Starter' | 'Main Course' | 'Dessert';

type MenuItem = {
  id: string;
  name: string;
  description: string;
  course: Course;
  price: number;
};

type FormErrors = {
  name?: string;
  description?: string;
  course?: string;
  price?: string;
};

const courses: Course[] = ['Starter', 'Main Course', 'Dessert'];

const App = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [screen, setScreen] = useState<'dashboard' | 'add'>('dashboard');

  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState<Course | ''>('');
  const [price, setPrice] = useState('');

  const [errors, setErrors] = useState<FormErrors>({});

  const resetForm = () => {
    setDishName('');
    setDescription('');
    setCourse('');
    setPrice('');
    setErrors({});
  };

  const validateForm = (): FormErrors => {
    const nextErrors: FormErrors = {};

    const trimmedName = dishName.trim();
    const trimmedDescription = description.trim();
    const trimmedPrice = price.trim();
    const numericPrice = Number(trimmedPrice);

    if (!trimmedName) {
      nextErrors.name = 'Dish name is required.';
    }

    if (!trimmedDescription) {
      nextErrors.description = 'Description is required.';
    }

    if (!course) {
      nextErrors.course = 'Please select a course.';
    }

    if (!trimmedPrice) {
      nextErrors.price = 'Price is required.';
    } else if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
      nextErrors.price = 'Please enter a valid price greater than 0.';
    }

    return nextErrors;
  };

  const handleSave = () => {
    const nextErrors = validateForm();

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0 || !course) {
      return;
    }

    const newItem: MenuItem = {
      id: `${Date.now()}`,
      name: dishName.trim(),
      description: description.trim(),
      course: course,
      price: Number(price.trim()),
    };

    setItems((currentItems) => [...currentItems, newItem]);

    resetForm();
    setScreen('dashboard');

    Alert.alert(
      'Menu item added',
      `${newItem.name} has been added successfully.`,
    );
  };

  const handleCourseChange = (selectedCourse: Course) => {
    setCourse(selectedCourse);

    // Remove the course validation error once a course is selected
    setErrors((currentErrors) => ({
      ...currentErrors,
      course: undefined,
    }));
  };

  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.menuCard}>
      <View style={styles.cardHeading}>
        <Text style={styles.dishName}>{item.name}</Text>

        <View style={styles.courseBadge}>
          <Text style={styles.courseBadgeText}>
            {item.course}
          </Text>
        </View>
      </View>

      <Text style={styles.description}>
        {item.description}
      </Text>

      <Text style={styles.price}>
        R{item.price.toFixed(2)}
      </Text>
    </View>
  );

  const renderDashboard = () => (
    <FlatList
      contentContainerStyle={styles.dashboardContent}
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={renderMenuItem}
      ListHeaderComponent={
        <View>
          <Text style={styles.title}>MENU MANAGER</Text>

          <Text style={styles.subtitle}>
            Manage your restaurant menu
          </Text>

          <Pressable
            accessibilityRole="button"
            onPress={() => setScreen('add')}
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.primaryButtonText}>
              + Add Menu Item
            </Text>
          </Pressable>

          {items.length > 0 && (
            <Text style={styles.sectionTitle}>
              Your Menu
            </Text>
          )}
        </View>
      }
      ListEmptyComponent={
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>
            No menu items have been added yet.
          </Text>

          <Text style={styles.emptyText}>
            Tap Add Menu Item to create your first dish.
          </Text>
        </View>
      }
      ItemSeparatorComponent={() => (
        <View style={styles.cardSeparator} />
      )}
    />
  );

  const renderError = (message?: string) =>
    message ? (
      <Text style={styles.errorText}>
        {message}
      </Text>
    ) : null;

  const renderAddItem = () => (
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
          onPress={() => {
            resetForm();
            setScreen('dashboard');
          }}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>
            ‹ Back
          </Text>
        </Pressable>

        <Text style={styles.title}>
          ADD MENU ITEM
        </Text>

        <Text style={styles.subtitle}>
          Add a new dish to your restaurant menu.
        </Text>

        {/* Dish Name */}
        <View style={styles.formField}>
          <Text style={styles.label}>
            Dish Name
          </Text>

          <TextInput
            autoCapitalize="words"
            onChangeText={setDishName}
            placeholder="Enter dish name"
            placeholderTextColor="#8A8A8A"
            style={[
              styles.input,
              errors.name && styles.inputError,
            ]}
            value={dishName}
          />

          {renderError(errors.name)}
        </View>

        {/* Description */}
        <View style={styles.formField}>
          <Text style={styles.label}>
            Description
          </Text>

          <TextInput
            multiline
            onChangeText={setDescription}
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
          <Text style={styles.label}>
            Course
          </Text>

          <Text style={styles.courseHelperText}>
            Select the course for this menu item
          </Text>

          <View style={styles.courseOptions}>
            {courses.map((courseOption) => {
              const isSelected = course === courseOption;

              return (
                <Pressable
                  key={courseOption}
                  accessibilityRole="button"
                  accessibilityState={{
                    selected: isSelected,
                  }}
                  onPress={() =>
                    handleCourseChange(courseOption)
                  }
                  style={({ pressed }) => [
                    styles.courseOption,
                    isSelected &&
                      styles.courseOptionSelected,
                    errors.course &&
                      styles.courseOptionError,
                    pressed &&
                      styles.courseOptionPressed,
                  ]}
                >
                  <Text
                    style={[
                      styles.courseOptionText,
                      isSelected &&
                        styles.courseOptionTextSelected,
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
              <Text style={styles.selectedCourseLabel}>
                Selected course:
              </Text>

              <Text style={styles.selectedCourse}>
                {course}
              </Text>
            </View>
          ) : null}

          {renderError(errors.course)}
        </View>

        {/* Price */}
        <View style={styles.formField}>
          <Text style={styles.label}>
            Price
          </Text>

          <TextInput
            keyboardType="decimal-pad"
            onChangeText={setPrice}
            placeholder="Enter price"
            placeholderTextColor="#8A8A8A"
            style={[
              styles.input,
              errors.price && styles.inputError,
            ]}
            value={price}
          />

          {renderError(errors.price)}
        </View>

        {/* Save Button */}
        <Pressable
          accessibilityRole="button"
          onPress={handleSave}
          style={({ pressed }) => [
            styles.primaryButton,
            styles.saveButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.primaryButtonText}>
            Save Menu Item
          </Text>
        </Pressable>

        {/* Cancel Button */}
        <Pressable
          accessibilityRole="button"
          onPress={() => {
            resetForm();
            setScreen('dashboard');
          }}
          style={styles.cancelButton}
        >
          <Text style={styles.cancelButtonText}>
            Cancel
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {screen === 'dashboard'
        ? renderDashboard()
        : renderAddItem()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#F8F8F8',
    flex: 1,
  },

  flex: {
    flex: 1,
  },

  dashboardContent: {
    padding: 24,
    paddingBottom: 36,
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

  sectionTitle: {
    color: '#202020',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },

  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
  },

  emptyTitle: {
    color: '#202020',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },

  emptyText: {
    color: '#666666',
    fontSize: 14,
    lineHeight: 21,
  },

  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 18,
  },

  cardHeading: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  dishName: {
    color: '#202020',
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    marginRight: 12,
  },

  /* Saved menu course badge */
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

  price: {
    color: '#202020',
    fontSize: 16,
    fontWeight: '700',
  },

  cardSeparator: {
    height: 12,
  },

  backButton: {
    marginBottom: 20,
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

  /* Course helper text */
  courseHelperText: {
    color: '#777777',
    fontSize: 12,
    marginBottom: 10,
  },

  /* Course selection buttons */
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

  /* Selected course confirmation */
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

export default App;
