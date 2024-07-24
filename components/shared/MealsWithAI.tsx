import React from 'react';
import { Button } from '../ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import MealGenForm from './MealGenForm';

const MealsWithAI: React.FC = () => {
  return (
    <div className="relative bg-purple-100 p-6 flex flex-col md:flex-row items-center justify-between">
      <div className="md:w-1/2">
        <img
          src="/assets/images/plan-meals-with-ai.jpg"
          alt="Delicious meal"
          className="w-full h-auto object-cover rounded-lg"
        />
      </div>
      <div className="md:w-1/2 md:pl-6 mt-4 md:mt-0">
        <h3 className="text-3xl font-bold mb-4">Plan your meals with AI</h3>
        <p className="text-lg mb-4">
          Have specific dietary restrictions and need personalized meals? Let our AI engine create a customized list of meal options just for you.
        </p>
        <Dialog>
        <DialogTrigger className='mt-1 bg-purple-gradient text-white p-2 rounded-md'>
            Get Started
        </DialogTrigger>
        <DialogContent>
    <DialogHeader>
      <DialogTitle className='mb-4'>Describe what you want to eat</DialogTitle>
      <DialogDescription>
        <MealGenForm/>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default MealsWithAI;
