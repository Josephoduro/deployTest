'use client';
import React, { useEffect, useState } from 'react';
import { fetchImages } from '@/lib/menuImage';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';

interface MenuWithRecipeProps {
  dish: string;
  ingredients: string;
  recipe: string;
  onClick: () => void;
}

const MenuWithRecipe: React.FC<MenuWithRecipeProps> = ({ dish, ingredients, recipe, onClick }) => {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchImage = async () => {
      const firstIngredient = ingredients.split(',')[0].trim();
      if (firstIngredient) {
        setLoading(true);
        const image = await fetchImages(firstIngredient);
        setImageSrc(image);
        setLoading(false);
      }
    };

    fetchImage();
  }, [ingredients]);

  return (
    <Card className="shadow-lg cursor-pointer transition-transform transform hover:scale-105" onClick={onClick}>
      {loading ? (
        <div className="w-full h-40 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div> {/* Spinner */}
        </div>
      ) : imageSrc ? (
        <img className="w-full h-40 object-cover" src={imageSrc} alt={dish} />
      ) : (
        <div className="w-full h-40 flex items-center justify-center text-gray-500">No Image Available</div>
      )}
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-semibold">{dish}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <p><strong>Ingredients:</strong> {ingredients}</p>
        <p><strong>Recipe:</strong> {recipe}</p>
      </CardContent>
    </Card>
  );
};

export default MenuWithRecipe;
