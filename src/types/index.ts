// Theme types
export type ThemeType = "light" | "dark" | "creamy" | "blue-gray" | "green" | "coral" | "purple" | "blue" | "yellow" | "system";

// User profile types
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  age?: number;
  gender?: "male" | "female" | "other";
  height?: number;
  weight?: number;
  activityLevel?: ActivityLevel;
  goal?: UserGoal;
  dietType?: DietType;
  dailyCalorieTarget?: number;
  dailyProteinTarget?: number;
  dailyCarbTarget?: number;
  dailyFatTarget?: number;
  createdAt: Date;
  updatedAt: Date;
}

export type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "very-active";

export type UserGoal = "lose-weight" | "maintain" | "gain-muscle" | "improve-health" | "custom";

export type DietType = 
  | "standard" 
  | "vegetarian" 
  | "vegan" 
  | "pescatarian" 
  | "keto" 
  | "paleo" 
  | "mediterranean" 
  | "low-carb" 
  | "low-fat" 
  | "gluten-free" 
  | "dairy-free" 
  | "custom";

// Food and nutrition types
export interface Food {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  sugar?: number;
  sodium?: number;
  cholesterol?: number;
  servingSize: string;
  servingSizeGrams: number;
  glycemicIndex?: number;
  category: FoodCategory;
  tags?: string[];
  image?: string;
  barcode?: string;
  isVerified: boolean;
  createdBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type FoodCategory = 
  | "protein" 
  | "dairy" 
  | "grain" 
  | "vegetable" 
  | "fruit" 
  | "fat" 
  | "processed" 
  | "beverage" 
  | "snack" 
  | "supplement" 
  | "other";

// Meal logging types
export interface MealEntry {
  id: string;
  userId: string;
  date: Date;
  mealType: MealType;
  foods: FoodPortion[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  notes?: string;
  images?: string[];
  mood?: MoodType;
  hunger?: number; // 1-10 scale
  fullness?: number; // 1-10 scale
  createdAt: Date;
  updatedAt: Date;
}

export interface FoodPortion {
  foodId: string;
  food: Food;
  quantity: number;
  servingSize: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export type MealType = "breakfast" | "lunch" | "dinner" | "snack";

export type MoodType = "great" | "good" | "neutral" | "bad" | "terrible";

// Progress and analytics types
export interface WeightEntry {
  id: string;
  userId: string;
  date: Date;
  weight: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NutritionSummary {
  date: Date;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  calorieTarget: number;
  proteinTarget: number;
  carbTarget: number;
  fatTarget: number;
  percentCaloriesGoal: number;
  percentProteinGoal: number;
  percentCarbGoal: number;
  percentFatGoal: number;
}

// Settings and preferences
export interface UserSettings {
  userId: string;
  theme: ThemeType;
  language: string;
  measurementSystem: "metric" | "imperial";
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  subscription?: SubscriptionInfo;
}

export interface NotificationSettings {
  mealReminders: boolean;
  progressUpdates: boolean;
  challenges: boolean;
  tips: boolean;
  remindersSchedule?: {
    breakfast?: string; // Time in format "HH:MM"
    lunch?: string;
    dinner?: string;
    snacks?: string[];
  };
}

export interface PrivacySettings {
  shareProfile: boolean;
  shareProgress: boolean;
  shareWorkouts: boolean;
  shareMeals: boolean;
}

export interface SubscriptionInfo {
  plan: "free" | "monthly" | "yearly";
  startDate: Date;
  endDate: Date;
  autoRenew: boolean;
  paymentMethod?: string;
}

// Achievements and gamification
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: AchievementCategory;
  condition: string;
  rewardPoints: number;
  isHidden: boolean;
}

export interface UserAchievement {
  userId: string;
  achievementId: string;
  achievement: Achievement;
  dateEarned: Date;
  progress: number; // Percentage complete (0-100)
  isComplete: boolean;
}

export type AchievementCategory = 
  | "streak" 
  | "nutrition" 
  | "weight" 
  | "activity" 
  | "social" 
  | "special";

// AI recommendations
export interface AiRecommendation {
  id: string;
  userId: string;
  date: Date;
  type: RecommendationType;
  title: string;
  description: string;
  reason: string;
  foods?: Food[];
  impact?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
    health?: string;
  };
  isApplied: boolean;
  createdAt: Date;
}

export type RecommendationType = 
  | "meal-suggestion" 
  | "nutrition-adjustment" 
  | "habit-change" 
  | "health-insight";
