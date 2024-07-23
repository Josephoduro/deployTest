"use client";

import { useSearchParams } from 'next/navigation'; 
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ClipLoader } from 'react-spinners';
import DialogueTab from '@/components/DialogueTab';
import { Button } from '@/components/ui/button';

const ResultsPage = () => {
  const searchParams = useSearchParams(); // Retrieve query parameters
  const ingredients = searchParams.get('ingredients') || '';
  const [meals, setMeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMeal, setSelectedMeal] = useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (ingredients) {
      setLoading(true);
      setError(null);

      axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
        .then(response => {
          if (response.data.meals) {
            setMeals(response.data.meals);
            setError(null);
          } else {
            setMeals([]);
            setError("Sorry, we didn't find any meal!");
          }
        })
        .catch(err => {
          console.error('Error fetching recipes:', err);
          setMeals([]);
          setError('Failed to fetch recipes. Please try again.');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [ingredients]);

  const handleViewRecipe = (mealId: string) => {
    axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then(response => {
        if (response.data.meals && response.data.meals.length > 0) {
          setSelectedMeal(response.data.meals[0]);
          setIsDialogOpen(true);
        }
      })
      .catch(err => {
        console.error('Error fetching recipe:', err);
        setError('Failed to fetch recipe. Please try again.');
      });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Meal Results</h1>
      {loading && <ClipLoader color="#3498db" />}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {meals.length > 0 ? (
          meals.map((meal) => (
            <Card key={meal.idMeal} className="shadow-lg">
              <CardHeader>
                <CardTitle>{meal.strMeal}</CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-40 object-cover mb-4"
                />
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleViewRecipe(meal.idMeal)} className="bg-purple-gradient text-white p-2">
                  View Recipe
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          !error && <p>Loading Meal Results</p>
        )}
      </div>

      <DialogueTab
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        meal={selectedMeal}
      />
    </div>
  );
};

export default ResultsPage;
