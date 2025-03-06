import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Plus, Trash2, ScanBarcode, Calculator, Save, Upload } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";

interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  price: number;
}

const ingredientDatabase: Record<string, { 
  calories: number; 
  protein: number; 
  carbs: number; 
  fat: number; 
  price: number;
}> = {
  "chicken_breast": { calories: 165, protein: 31, carbs: 0, fat: 3.6, price: 320 },
  "rice": { calories: 130, protein: 2.7, carbs: 28, fat: 0.3, price: 90 },
  "potato": { calories: 77, protein: 2, carbs: 17, fat: 0.1, price: 60 },
  "egg": { calories: 155, protein: 13, carbs: 1.1, fat: 11, price: 120 },
  "milk": { calories: 42, protein: 3.4, carbs: 5, fat: 1, price: 80 },
  "flour": { calories: 364, protein: 10, carbs: 76, fat: 1, price: 70 },
  "butter": { calories: 717, protein: 0.9, carbs: 0.1, fat: 81, price: 560 },
  "sugar": { calories: 387, protein: 0, carbs: 100, fat: 0, price: 90 },
  "oil": { calories: 884, protein: 0, carbs: 0, fat: 100, price: 130 },
  "carrot": { calories: 41, protein: 0.9, carbs: 10, fat: 0.2, price: 60 },
  "onion": { calories: 40, protein: 1.1, carbs: 9, fat: 0.1, price: 50 },
  "tomato": { calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, price: 150 },
  "cheese": { calories: 402, protein: 25, carbs: 1.3, fat: 33, price: 450 }
};

const RecipeCalculator = () => {
  const { t, language } = useLanguage();
  const [recipeName, setRecipeName] = useState("");
  const [calculationMethod, setCalculationMethod] = useState("servings");
  const [servings, setServings] = useState(4);
  const [recipeWeight, setRecipeWeight] = useState(1000);
  const [targetServings, setTargetServings] = useState(4);
  const [targetWeight, setTargetWeight] = useState(1000);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [amount, setAmount] = useState(100);
  const [unit, setUnit] = useState("g");
  
  useEffect(() => {
    const savedRecipes = localStorage.getItem('recipes');
    if (savedRecipes) {
      try {
        const recipes = JSON.parse(savedRecipes);
        
        if (recipes.length > 0) {
          const lastRecipe = recipes[recipes.length - 1];
          loadRecipe(lastRecipe);
        } else {
          toast.info(t.loadRecipe, {
            description: t.language === 'ru' 
              ? 'У вас еще нет сохраненных рецептов' 
              : 'You don\'t have any saved recipes yet'
          });
        }
      } catch (e) {
        console.error('Error loading recipes:', e);
        toast.error(t.loadRecipe, {
          description: t.language === 'ru' 
            ? 'Ошибка при загрузке рецептов' 
            : 'Error loading recipes'
        });
      }
    } else {
      toast.info(t.loadRecipe, {
        description: t.language === 'ru' 
          ? 'У вас еще нет сохраненных рецептов' 
          : 'You don\'t have any saved recipes yet'
      });
    }
  }, [t]);
  
  const calculateTotals = () => {
    return ingredients.reduce((acc, ingredient) => {
      const factor = ingredient.amount / 100;
      return {
        calories: acc.calories + ingredient.calories * factor,
        protein: acc.protein + ingredient.protein * factor,
        carbs: acc.carbs + ingredient.carbs * factor,
        fat: acc.fat + ingredient.fat * factor,
        price: acc.price + ingredient.price * factor
      };
    }, { calories: 0, protein: 0, carbs: 0, fat: 0, price: 0 });
  };
  
  const calculatePerServing = (totals: { 
    calories: number; 
    protein: number; 
    carbs: number; 
    fat: number; 
    price: number;
  }) => {
    return {
      calories: totals.calories / servings,
      protein: totals.protein / servings,
      carbs: totals.carbs / servings,
      fat: totals.fat / servings,
      price: totals.price / servings
    };
  };
  
  const calculatePer100g = (totals: { 
    calories: number; 
    protein: number; 
    carbs: number; 
    fat: number; 
    price: number;
  }) => {
    return {
      calories: (totals.calories / recipeWeight) * 100,
      protein: (totals.protein / recipeWeight) * 100,
      carbs: (totals.carbs / recipeWeight) * 100,
      fat: (totals.fat / recipeWeight) * 100,
      price: (totals.price / recipeWeight) * 100
    };
  };
  
  const addIngredient = () => {
    if (!selectedIngredient) {
      toast.error(t.ingredient, {
        description: language === 'ru' ? "Пожалуйста, выберите ингредиент" : "Please select an ingredient"
      });
      return;
    }
    
    const ingredientData = ingredientDatabase[selectedIngredient];
    if (!ingredientData) return;
    
    const newIngredient: Ingredient = {
      id: `${selectedIngredient}_${Date.now()}`,
      name: getIngredientDisplayName(selectedIngredient),
      amount,
      unit,
      calories: ingredientData.calories,
      protein: ingredientData.protein,
      carbs: ingredientData.carbs,
      fat: ingredientData.fat,
      price: ingredientData.price
    };
    
    setIngredients([...ingredients, newIngredient]);
    
    setSelectedIngredient("");
    setAmount(100);
    setUnit("g");
    
    toast.success(t.addIngredient, {
      description: `${newIngredient.name} (${amount}${unit}) ${t.add}`
    });
  };
  
  const removeIngredient = (id: string) => {
    setIngredients(ingredients.filter(ingredient => ingredient.id !== id));
  };
  
  const getIngredientDisplayName = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      ru: {
        "chicken_breast": "Куриная грудка",
        "rice": "Рис",
        "potato": "Картофель",
        "egg": "Яйцо",
        "milk": "Молоко",
        "flour": "Мука",
        "butter": "Масло",
        "sugar": "Сахар",
        "oil": "Масло растительное",
        "carrot": "Морковь",
        "onion": "Лук",
        "tomato": "Томаты",
        "cheese": "Сыр"
      },
      en: {
        "chicken_breast": "Chicken Breast",
        "rice": "Rice",
        "potato": "Potato",
        "egg": "Egg",
        "milk": "Milk",
        "flour": "Flour",
        "butter": "Butter",
        "sugar": "Sugar",
        "oil": "Oil",
        "carrot": "Carrot",
        "onion": "Onion",
        "tomato": "Tomato",
        "cheese": "Cheese"
      }
    };
    
    return language === 'ru' ? translations.ru[key] || key : translations.en[key] || key;
  };
  
  const formatNumber = (num: number) => {
    return Math.round(num * 10) / 10;
  };
  
  const saveRecipe = () => {
    if (!recipeName) {
      toast.error(t.recipeTitle, {
        description: language === 'ru' ? "Пожалуйста, введите название рецепта" : "Please enter a recipe title"
      });
      return;
    }
    
    if (ingredients.length === 0) {
      toast.error(t.ingredients, {
        description: language === 'ru' ? "Добавьте хотя бы один ингредиент" : "Add at least one ingredient"
      });
      return;
    }
    
    const recipe = {
      id: Date.now(),
      name: recipeName,
      servings,
      weight: recipeWeight,
      ingredients,
      date: new Date().toISOString()
    };
    
    const savedRecipes = localStorage.getItem('recipes');
    let recipes = [];
    
    if (savedRecipes) {
      try {
        recipes = JSON.parse(savedRecipes);
      } catch (e) {
        console.error('Error parsing saved recipes:', e);
      }
    }
    
    recipes.push(recipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    
    toast.success(t.saveRecipe, {
      description: `${recipeName} ${t.save}`
    });
  };
  
  const recalculateRecipe = () => {
    if (ingredients.length === 0) {
      toast.error(t.ingredients, {
        description: language === 'ru' ? "Добавьте хотя бы один ингредиент" : "Add at least one ingredient"
      });
      return;
    }
    
    let factor;
    if (calculationMethod === "servings") {
      factor = targetServings / servings;
      setServings(targetServings);
    } else {
      factor = targetWeight / recipeWeight;
      setRecipeWeight(targetWeight);
    }
    
    const newIngredients = ingredients.map(ingredient => ({
      ...ingredient,
      amount: ingredient.amount * factor
    }));
    
    setIngredients(newIngredients);
    
    toast.success(t.recalculate, {
      description: language === 'ru' ? "Рецепт успешно пересчитан" : "Recipe successfully recalculated"
    });
  };
  
  const handleLoadRecipe = () => {
    const savedRecipes = localStorage.getItem('recipes');
    
    if (savedRecipes) {
      try {
        const recipes = JSON.parse(savedRecipes);
        
        if (recipes.length > 0) {
          const lastRecipe = recipes[recipes.length - 1];
          loadRecipe(lastRecipe);
        } else {
          toast.info(t.loadRecipe, {
            description: t.language === 'ru' 
              ? 'У вас еще нет сохраненных рецептов' 
              : 'You don\'t have any saved recipes yet'
          });
        }
      } catch (e) {
        console.error('Error loading recipes:', e);
        toast.error(t.loadRecipe, {
          description: t.language === 'ru' 
            ? 'Ошибка при загрузке рецептов' 
            : 'Error loading recipes'
        });
      }
    } else {
      toast.info(t.loadRecipe, {
        description: t.language === 'ru' 
          ? 'У вас еще нет сохраненных рецептов' 
          : 'You don\'t have any saved recipes yet'
      });
    }
  };
  
  const loadRecipe = (recipe: { 
    id: number; 
    name: string; 
    servings: number; 
    weight: number; 
    ingredients: Ingredient[];
    date: string;
  }) => {
    setRecipeName(recipe.name);
    setServings(recipe.servings);
    setRecipeWeight(recipe.weight);
    setIngredients(recipe.ingredients);
  };
  
  const totals = calculateTotals();
  const macroData = [
    { name: t.protein, value: totals.protein, color: "#3B82F6" },
    { name: t.carbs, value: totals.carbs, color: "#10B981" },
    { name: t.fat, value: totals.fat, color: "#F59E0B" }
  ];
  
  return (
    <div className="container max-w-7xl mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">{t.recipeCalculator}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t.recipeTitle}</CardTitle>
              <CardDescription>{t.ingredients}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="mb-4">
                <Label htmlFor="recipe-name">{t.recipeTitle}</Label>
                <Input 
                  id="recipe-name" 
                  value={recipeName} 
                  onChange={(e) => setRecipeName(e.target.value)} 
                  placeholder={language === 'ru' ? "Введите название рецепта" : "Enter recipe name"}
                  className="mt-2"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="servings">{t.servings}</Label>
                  <Input 
                    id="servings" 
                    type="number" 
                    min="1" 
                    value={servings} 
                    onChange={(e) => setServings(parseInt(e.target.value) || 1)} 
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="weight">{t.weight} (g)</Label>
                  <Input 
                    id="weight" 
                    type="number" 
                    min="1" 
                    value={recipeWeight} 
                    onChange={(e) => setRecipeWeight(parseInt(e.target.value) || 1)} 
                    className="mt-2"
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">{t.ingredients}</h3>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => toast.info(t.scanIngredient, { description: language === 'ru' ? "Функция будет доступна в следующем обновлении" : "This feature will be available in the next update" })}
                  >
                    <ScanBarcode className="h-4 w-4 mr-2" />
                    {t.scanIngredient}
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="sm:col-span-2">
                    <Label htmlFor="ingredient">{t.ingredient}</Label>
                    <Select value={selectedIngredient} onValueChange={setSelectedIngredient}>
                      <SelectTrigger id="ingredient" className="mt-2">
                        <SelectValue placeholder={language === 'ru' ? "Выберите ингредиент" : "Select ingredient"} />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(ingredientDatabase).map(key => (
                          <SelectItem key={key} value={key}>
                            {getIngredientDisplayName(key)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="amount">{t.amount}</Label>
                    <Input 
                      id="amount" 
                      type="number" 
                      min="1" 
                      value={amount} 
                      onChange={(e) => setAmount(parseInt(e.target.value) || 1)} 
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="unit">{t.unit}</Label>
                    <Select value={unit} onValueChange={setUnit}>
                      <SelectTrigger id="unit" className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="g">{t.gram}</SelectItem>
                        <SelectItem value="ml">{t.ml}</SelectItem>
                        <SelectItem value="tbsp">{t.tbsp}</SelectItem>
                        <SelectItem value="tsp">{t.tsp}</SelectItem>
                        <SelectItem value="pcs">{t.piece}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button onClick={addIngredient}>
                  <Plus className="h-4 w-4 mr-2" />
                  {t.addIngredient}
                </Button>
                
                {ingredients.length > 0 && (
                  <div className="mt-4">
                    <div className="bg-muted p-2 rounded grid grid-cols-6 gap-2 text-sm font-medium">
                      <div className="col-span-2">{t.ingredient}</div>
                      <div>{t.amount}</div>
                      <div>{t.calories}</div>
                      <div>{t.protein}</div>
                      <div></div>
                    </div>
                    {ingredients.map(ingredient => (
                      <div key={ingredient.id} className="p-2 border-b grid grid-cols-6 gap-2 items-center">
                        <div className="col-span-2">{ingredient.name}</div>
                        <div>{formatNumber(ingredient.amount)} {ingredient.unit}</div>
                        <div>{formatNumber(ingredient.calories * ingredient.amount / 100)}</div>
                        <div>{formatNumber(ingredient.protein * ingredient.amount / 100)}g</div>
                        <div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => removeIngredient(ingredient.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleLoadRecipe}>
                <Upload className="h-4 w-4 mr-2" />
                {t.loadRecipe}
              </Button>
              <Button onClick={saveRecipe}>
                <Save className="h-4 w-4 mr-2" />
                {t.saveRecipe}
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t.nutritionFacts}</CardTitle>
              <CardDescription>{t.perServing}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {ingredients.length > 0 ? (
                <>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={macroData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={60}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {macroData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={entry.color} 
                              stroke="transparent" 
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>{t.calories}:</span>
                      <span className="font-medium">{formatNumber(totals.calories)} kcal</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.protein}:</span>
                      <span className="font-medium">{formatNumber(totals.protein)} g</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.carbs}:</span>
                      <span className="font-medium">{formatNumber(totals.carbs)} g</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.fat}:</span>
                      <span className="font-medium">{formatNumber(totals.fat)} g</span>
                    </div>
                    
                    <Separator className="my-2" />
                    
                    <Tabs defaultValue="per-serving">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="per-serving">{t.perServing}</TabsTrigger>
                        <TabsTrigger value="per-100g">{t.per100g}</TabsTrigger>
                      </TabsList>
                      <TabsContent value="per-serving" className="space-y-2 pt-2">
                        {Object.entries(calculatePerServing(totals)).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span>{t[key as keyof typeof t] || key}:</span>
                            <span className="font-medium">
                              {formatNumber(value)} {key === 'price' ? '₽' : key === 'calories' ? 'kcal' : 'g'}
                            </span>
                          </div>
                        ))}
                      </TabsContent>
                      <TabsContent value="per-100g" className="space-y-2 pt-2">
                        {Object.entries(calculatePer100g(totals)).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span>{t[key as keyof typeof t] || key}:</span>
                            <span className="font-medium">
                              {formatNumber(value)} {key === 'price' ? '₽' : key === 'calories' ? 'kcal' : 'g'}
                            </span>
                          </div>
                        ))}
                      </TabsContent>
                    </Tabs>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  {language === 'ru' ? "Добавьте ингредиенты, чтобы увидеть пищевую ценность" : "Add ingredients to see nutrition information"}
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>{t.adjustRecipe}</CardTitle>
              <CardDescription>{t.recalculate}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label>{t.calculationBasis}</Label>
                  <Select 
                    value={calculationMethod} 
                    onValueChange={setCalculationMethod}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="servings">{t.byServings}</SelectItem>
                      <SelectItem value="weight">{t.byWeight}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {calculationMethod === "servings" ? (
                  <div>
                    <Label htmlFor="target-servings">{t.targetServings}</Label>
                    <Input 
                      id="target-servings" 
                      type="number" 
                      min="1" 
                      value={targetServings} 
                      onChange={(e) => setTargetServings(parseInt(e.target.value) || 1)} 
                      className="mt-2"
                    />
                  </div>
                ) : (
                  <div>
                    <Label htmlFor="target-weight">{t.targetWeight}</Label>
                    <Input 
                      id="target-weight" 
                      type="number" 
                      min="1" 
                      value={targetWeight} 
                      onChange={(e) => setTargetWeight(parseInt(e.target.value) || 1)} 
                      className="mt-2"
                    />
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={recalculateRecipe}>
                <Calculator className="h-4 w-4 mr-2" />
                {t.recalculate}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RecipeCalculator;
