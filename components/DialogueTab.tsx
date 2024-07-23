"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DialogTabProps {
  isOpen: boolean;
  onClose: () => void;
  meal: {
    strMeal?: string;
    strCategory?: string;
    strMealThumb?: string;
    strInstructions?: string;
    [key: string]: any;
  } | null;
}

const DialogTab: React.FC<DialogTabProps> = ({ isOpen, onClose, meal }) => {
  if (!meal) return null;

  // Extracting ingredients and measurements
  const ingredients: string[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(`${measure ? measure : ''} ${ingredient}`);
    }
  }

  // Formatting instructions into a list
  const instructions: string[] = meal.strInstructions
    ? meal.strInstructions.split('. ').filter((instr: string) => instr.trim() !== "")
    : [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-auto max-h-[80vh] overflow-y-auto p-4">
        <DialogHeader>
          <DialogTitle>{meal.strMeal ? meal.strMeal : 'Meal'}</DialogTitle>
          <DialogDescription>{meal.strCategory ? meal.strCategory : 'Category'}</DialogDescription>
        </DialogHeader>
        <div>
          {meal.strMealThumb && (
            <img src={meal.strMealThumb} alt={meal.strMeal ? meal.strMeal : 'Meal'} className="w-full h-40 object-cover mb-4" />
          )}
          <div className="mt-4">
            <h3 className="font-bold text-lg">Ingredients</h3>
            <ul className="list-disc pl-5 mb-4">
              {ingredients.length > 0 ? (
                ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))
              ) : (
                <li>No ingredients available</li>
              )}
            </ul>
            <h3 className="font-bold text-lg">Instructions</h3>
            <ul className="list-disc pl-5">
              {instructions.length > 0 ? (
                instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))
              ) : (
                <li>No instructions available</li>
              )}
            </ul>
          </div>
        </div>
        <Button onClick={onClose} className="bg-purple-gradient text-white p-2 mt-4">Close</Button>
      </DialogContent>
    </Dialog>
  );
};

export default DialogTab;
