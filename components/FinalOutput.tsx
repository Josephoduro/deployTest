import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PositionInfo } from "@/hooks/userCrewJob";

interface FinalOutputProps {
  positionInfoList: PositionInfo[];
}

export const FinalOutput: React.FC<FinalOutputProps> = ({ positionInfoList }) => {
  const [selectedCuisine, setSelectedCuisine] = useState<PositionInfo | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = (cuisine: PositionInfo) => {
    setSelectedCuisine(cuisine);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setSelectedCuisine(null);
    setIsDialogOpen(false);
  };

  // Function to format ingredients and recipes into a list
  const formatList = (text: string | string[] | undefined) => {
    if (Array.isArray(text)) {
      return text.map((item, index) => (
        <li key={index} className="list-disc pl-5">{item.trim()}</li>
      ));
    }

    if (typeof text === "string") {
      return text.split(',').map((item, index) => (
        <li key={index} className="list-disc pl-5">{item.trim()}</li>
      ));
    }

    return [];
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto p-4">
      <h2 className="text-lg font-semibold mb-4">Menu Generated</h2>
      <div className="flex-grow overflow-y-auto border-2 border-gray-300 p-4 rounded-lg bg-white shadow-md">
        {positionInfoList.length === 0 ? (
          <p className="text-center text-gray-500">No Menu Created yet.</p>
        ) : (
          positionInfoList.map((cuisine, index) => (
            <div
              key={index}
              className="mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded"
              onClick={() => openDialog(cuisine)}
            >
              <p className="font-semibold text-gray-700">
                <strong>Dish:</strong> {cuisine.Dish}
              </p>
              <p className="text-gray-600">
                <strong>Ingredients:</strong> {cuisine.Ingredients}
              </p>
              <p className="text-gray-600">
                <strong>Recipe:</strong> {cuisine.Recipe}
              </p>
            </div>
          ))
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
        <DialogContent className="max-w-4xl h-auto max-h-[80vh] overflow-y-auto p-4">
          {selectedCuisine && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedCuisine.Dish || 'Dish'}</DialogTitle>
              </DialogHeader>
              <div>
                <h3 className="font-bold text-lg">Ingredients</h3>
                <ul>
                  {formatList(selectedCuisine.Ingredients)}
                </ul>
                <h3 className="font-bold text-lg mt-4">Recipe</h3>
                <ul>
                  {formatList(selectedCuisine.Recipe)}
                </ul>
              </div>
              <Button onClick={closeDialog} className="bg-purple-gradient text-white mt-4">Close</Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
