'use client';
import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { fetchImages } from '@/lib/menuImage';
import Spinner from "@/components/shared/Spinner";

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
      if (position.Dish) {
        setLoading(true);
        const image = await fetchImages(position.Dish);
        setImageSrc(image);
        setLoading(false);
      }
    };

    fetchImage();
  }, [position.Dish]);

  return (
    <Card className="shadow-lg cursor-pointer transition-transform transform hover:scale-105" onClick={onClick}>
      {loading ? (
        <div className="w-full h-40 flex items-center justify-center">
          <Spinner />
        </div>
      ) : imageSrc ? (
        <img className="w-full h-40 object-cover" src={imageSrc} alt={position.Dish} />
      ) : (
        <div className="w-full h-40 flex items-center justify-center text-gray-500">No Image Available</div>
      )}
      <CardHeader className="p-4">
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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Generated Menu</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {positionInfoList.map((position, index) => (
          <FinalOutputCard
            key={index}
            position={position}
            onClick={() => handleViewRecipe(position)}
          />
        ))}
      </div>

      {selectedDish && (
        <Dialog  open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="p-4">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold">{selectedDish.Dish}</DialogTitle>
              <DialogDescription className="mt-2 text-sm">
                <p><strong>Ingredients:</strong> {selectedDish.Ingredients}</p>
                <p className="mt-1"><strong>Recipe:</strong> {selectedDish.Recipe}</p>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button>Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
