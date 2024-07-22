// components/ui/DialogTab.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DialogTabProps {
  isOpen: boolean;
  onClose: () => void;
  meal: any;
}

const DialogTab: React.FC<DialogTabProps> = ({ isOpen, onClose, meal }) => {
  if (!meal) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-auto max-h-[80vh] overflow-y-auto p-4">
        <DialogHeader>
          <DialogTitle>{meal.strMeal}</DialogTitle>
          <DialogDescription>{meal.strCategory}</DialogDescription>
        </DialogHeader>
        <div>
          <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-40 object-cover mb-4" />
          <div className="mt-4">
            <h3 className="font-bold text-lg">Instructions</h3>
            <p>{meal.strInstructions}</p>
          </div>
        </div>
        
      </DialogContent>
    </Dialog>
  );
};

export default DialogTab;
