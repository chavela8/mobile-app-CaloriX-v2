
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";
import { Clock, ChefHat, Edit, Trash2 } from "lucide-react";

interface SavedRecipe {
  id: number;
  name: string;
  servings: number;
  ingredients: any[];
  date: string;
}

const SavedRecipes = ({ onLoadRecipe }: { onLoadRecipe: (recipe: SavedRecipe) => void }) => {
  const { t } = useLanguage();
  const [recipes, setRecipes] = useState<SavedRecipe[]>([]);
  
  useEffect(() => {
    const savedRecipes = localStorage.getItem('recipes');
    if (savedRecipes) {
      try {
        const parsedRecipes = JSON.parse(savedRecipes);
        setRecipes(parsedRecipes);
      } catch (e) {
        console.error('Error loading recipes:', e);
      }
    }
  }, []);
  
  const handleDeleteRecipe = (id: number) => {
    const newRecipes = recipes.filter(recipe => recipe.id !== id);
    setRecipes(newRecipes);
    localStorage.setItem('recipes', JSON.stringify(newRecipes));
    toast.success(t.language === 'ru' ? 'Рецепт удален' : 'Recipe deleted', {
      description: t.language === 'ru' ? 'Рецепт был успешно удален' : 'Recipe was successfully deleted'
    });
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{t.mySavedRecipes}</CardTitle>
        <CardDescription>
          {t.language === 'ru' 
            ? 'Просмотр и управление сохраненными рецептами' 
            : 'View and manage your saved recipes'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {recipes.length === 0 ? (
          <div className="text-center py-8 border rounded-md border-dashed">
            <ChefHat className="mx-auto h-10 w-10 text-muted-foreground/50 mb-2" />
            <p className="text-muted-foreground">
              {t.language === 'ru' 
                ? 'У вас еще нет сохраненных рецептов' 
                : 'You don\'t have any saved recipes yet'}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {t.language === 'ru' 
                ? 'Сохраните рецепт, чтобы он появился здесь' 
                : 'Save a recipe to see it here'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {recipes.map(recipe => (
              <div key={recipe.id} className="border p-4 rounded-md hover:bg-accent/5 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{recipe.name}</h3>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => onLoadRecipe(recipe)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteRecipe(recipe.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <ChefHat className="h-3 w-3 mr-1" />
                    <span>{t.servings}: {recipe.servings}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>
                      {new Date(recipe.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SavedRecipes;
