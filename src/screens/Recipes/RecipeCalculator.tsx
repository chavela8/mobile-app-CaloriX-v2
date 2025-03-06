import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import RecipeList from './RecipeList';
import SavedRecipesSection from './SavedRecipesSection';
import styles from './styles';

const RecipeCalculator: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    loadRecipes();
    loadSavedRecipes();
  }, []);

  return (
    <View style={styles.container}>
      <RecipeList recipes={recipes} />
      <SavedRecipesSection recipes={savedRecipes} />
    </View>
  );
};

export default RecipeCalculator; 