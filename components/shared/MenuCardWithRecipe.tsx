'use client';
import React, { useEffect, useState } from 'react';
import { fetchImages } from '@/lib/menuImage';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';

interface MenuWithRecipeProps {
  dish: string;
  ingredients: string;
  recipe: string;
  onClick: () => void;
}

const MenuWithRecipe: React.FC<MenuWithRecipeProps> = ({ dish, ingredients, recipe, onClick }) => {
  const [imageSrc, setImageSrc] = useState<string>('');

  useEffect(() => {
    const fetchImage = async () => {
      if (dish) {
        const image = await fetchImages(dish); // Fetch image based on the dish name
        setImageSrc(image);
      }
    };

    fetchImage();
  }, [dish]);

  return (
    <Card className="shadow-lg cursor-pointer" onClick={onClick}>
      {imageSrc && <img className="w-full h-40 object-cover" src={imageSrc} alt={dish} />}
      <CardHeader>
        <CardTitle>{dish}</CardTitle>
      </CardHeader>
      <CardContent>
        <p><strong>Ingredients:</strong> {ingredients}</p>
        <p><strong>Recipe:</strong> {recipe}</p>
      </CardContent>
    </Card>
  );
};

export default MenuWithRecipe;
