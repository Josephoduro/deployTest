"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

type NameCalorie = {
  ingredients: string;
  calorie: string;
};

type PositionInfo = {
  Dish: string;
  Ingredients: string;
  Recipe: string;
  Total_Calories: NameCalorie[];
};

export default function FinalOutput() {
  const [positionInfoList, setPositionInfoList] = useState<PositionInfo[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("menuData");
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        setPositionInfoList(parsedData);
      } catch (error) {
        console.error("Failed to parse menuData from localStorage:", error);
      }
    }
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Generated Menu</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {positionInfoList.map((position, index) => (
          <Card key={index} className="shadow-lg">
            <CardContent>
              <h2 className="text-xl font-semibold mb-2">{position.Dish}</h2>
              <p><strong>Ingredients:</strong> {position.Ingredients}</p>
              <p><strong>Recipe:</strong> {position.Recipe}</p>
              <p>
                <strong>Total Calories:</strong> 
                {Array.isArray(position.Total_Calories)
                  ? position.Total_Calories.map((item) => `${item.ingredients}: ${item.calorie}`).join(", ")
                  : "N/A"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
