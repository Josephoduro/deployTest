'use client';
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { fetchImages } from '@/lib/menuImage';

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

const FinalOutputCard: React.FC<{ position: PositionInfo, onClick: () => void }> = ({ position, onClick }) => {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchImage = async () => {
      const dishWords = position.Dish.split(' ');
      const lastTwoWords = dishWords.slice(-2).join(' ');
      const image = await fetchImages(lastTwoWords);
      setImageSrc(image || '');
      setLoading(false);
    };

    fetchImage();
  }, [position.Dish]);

  return (
    <Card className="shadow-lg cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl duration-300 ease-in-out" onClick={onClick}>
      {loading ? (
        <div className="w-full h-40 flex items-center justify-center bg-gray-100 rounded-t-md">
          <div className="w-12 h-12 border-4 border-purple-300 border-t-transparent rounded-full animate-spin"></div> {/* Spinner */}
        </div>
      ) : imageSrc ? (
        <img className="w-full h-40 object-cover rounded-t-md" src={imageSrc} alt={position.Dish} />
      ) : (
        <div className="w-full h-40 flex items-center justify-center bg-gray-100 text-gray-500 rounded-t-md">No Image Available</div>
      )}
      <CardHeader className="p-4 bg-gray-800 text-white rounded-b-md">
        <CardTitle className="text-lg font-semibold">{position.Dish}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <p><strong>Ingredients:</strong> {position.Ingredients}</p>
        <p><strong>Recipe:</strong> {position.Recipe}</p>
      </CardContent>
    </Card>
  );
};

export default function FinalOutput() {
  const [positionInfoList, setPositionInfoList] = useState<PositionInfo[]>([]);
  const [selectedDish, setSelectedDish] = useState<PositionInfo | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  const handleViewRecipe = (dish: PositionInfo) => {
    setSelectedDish(dish);
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-5xl font-extrabold text-white bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-center py-6 rounded-lg shadow-xl mb-8">
        Your Generated Menu
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {positionInfoList.map((position, index) => (
          <FinalOutputCard
            key={index}
            position={position}
            onClick={() => handleViewRecipe(position)}
          />
        ))}
      </div>

      {selectedDish && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} >
          <DialogContent className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold">{selectedDish.Dish}</DialogTitle>
              <DialogDescription className="mt-2 text-lg">
                <p><strong>Ingredients:</strong> {selectedDish.Ingredients}</p>
                <p className="mt-2"><strong>Recipe:</strong> {selectedDish.Recipe}</p>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-4 flex justify-end">
              <DialogClose asChild>
                <Button className="bg-purple-600 text-white hover:bg-purple-700">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
