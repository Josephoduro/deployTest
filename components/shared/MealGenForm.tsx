"use client"; 
import Link from "next/link";
import { FinalOutput } from "../FinalOutput";
import { useState, useEffect } from "react";
import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useCrewJob } from "@/hooks/userCrewJob";
import { EventLog } from "../EventsLogOut";

type InputSectionProps = {
  data: string[];
  setData: Dispatch<SetStateAction<string[]>>;
};

export default function PlaceholderContent() {
  const crewJob = useCrewJob();

  const [step, setStep] = useState(1);
  const [menuGenerated, setMenuGenerated] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
        setMenuGenerated(true); // Simulate completion of menu generation
      }, 13000); // 3 minutes loading time

      return () => clearTimeout(timer);
    }
  }, [loading]);

  const nextStep = () => {
    setStep((prevStep) => Math.min(prevStep + 1, 3));
  };

  const prevStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity()) {
      console.log('Form submitted');
    } else {
      console.error('Form validation failed');
    }
  };

  const handleGenerateMenu = () => {
    setLoading(true);
  };

  const handleRestart = () => {
    setStep(1);
    setMenuGenerated(false);
  };

  const handleDownloadMenu = () => {
    // Implement your download logic here
    alert('Downloading menu...');
  };

  return (
    <Card className="border-none mt-2">
      <CardContent className="p-6">
        <div className="flex justify-center items-center min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
          <div className="flex flex-col w-full max-w-lg space-y-4">
            {!menuGenerated && !loading && (
              <form className="flex flex-col space-y-4" onSubmit={handleSubmit} noValidate>
                <div className="text-2xl font-semibold text-center mb-4">Generate Menu With AI</div>

                {step === 1 && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="diet" className="block text-sm font-medium text-gray-700 mb-1">
                        Select a dietary preference
                      </Label>
                      <Select value={crewJob.diet} onValueChange={crewJob.setDiet} required>
                        <SelectTrigger id="diet" className="w-full">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="vegan">Vegan</SelectItem>
                            <SelectItem value="keto">Keto</SelectItem>
                            <SelectItem value="gluten-free">Gluten Free</SelectItem>
                            <SelectItem value="paleo">Paleo</SelectItem>
                            <SelectItem value="no restrictions">No restrictions</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="meal_type" className="block text-sm font-medium text-gray-700 mb-1">
                        Select meal type
                      </Label>
                      <Select value={crewJob.meal_type} onValueChange={crewJob.setMealType} required>
                        <SelectTrigger id="meal_type" className="w-full">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="breakfast">Breakfast</SelectItem>
                            <SelectItem value="Lunch">Lunch</SelectItem>
                            <SelectItem value="supper">Supper</SelectItem>
                            <SelectItem value="snacks">Snacks</SelectItem>
                            <SelectItem value="any">Any</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cuisine" className="block text-sm font-medium text-gray-700 mb-1">
                        Which cuisines do you enjoy the most?
                      </Label>
                      <Select value={crewJob.cuisine} onValueChange={crewJob.setCuisine} required>
                        <SelectTrigger id="cuisine" className="w-full">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="Italian">Italian</SelectItem>
                            <SelectItem value="French">French</SelectItem>
                            <SelectItem value="African">African</SelectItem>
                            <SelectItem value="Indian">Indian</SelectItem>
                            <SelectItem value="Mexican">Mexican</SelectItem>
                            <SelectItem value="American">American</SelectItem>
                            <SelectItem value="Mediterranean">Mediterranean</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="recipe" className="block text-sm font-medium text-gray-700 mb-1">
                        Select your ideal recipe
                      </Label>
                      <Select value={crewJob.recipe} onValueChange={crewJob.setRecipe} required>
                        <SelectTrigger id="recipe" className="w-full">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="Family-size">Family size</SelectItem>
                            <SelectItem value="Quick-meal">Quick meal</SelectItem>
                            <SelectItem value="Single serve">Single serve</SelectItem>
                            <SelectItem value="Any">Any</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="fav-ingredient" className="block text-sm font-medium text-gray-700 mb-1">
                        What ingredients should be included in the menu?
                      </Label>
                      <Input
                        id="fav-ingredient"
                        placeholder="E.g Soy sauce"
                        className="w-full mb-2"
                        value={crewJob.ingredient}
                        onChange={(e) => crewJob.setIngredient(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="fav-nutrition" className="block text-sm font-medium text-gray-700 mb-1">
                        What nutritional considerations do you have?
                      </Label>
                      <Input
                        id="fav-nutrition"
                        placeholder="E.g High Protein"
                        className="w-full mb-2"
                        value={crewJob.nutrition}
                        onChange={(e) => crewJob.setNutrition(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="fav-goals" className="block text-sm font-medium text-gray-700 mb-1">
                        What goals do you aim to achieve with this menu?
                      </Label>
                      <Input
                        id="fav-goals"
                        placeholder="E.g Weight loss"
                        className="w-full mb-4"
                        value={crewJob.goals}
                        onChange={(e) => crewJob.setGoals(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-between">
                  {step > 1 && (
                    <Button onClick={prevStep} type="button" className="w-[100px] bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600">
                      Previous
                    </Button>
                  )}
                  {step < 3 ? (
                    <Button onClick={nextStep} type="button" className="w-[100px] bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
                      Next
                    </Button>
                  ) : (
                    <Button onClick={() => {crewJob.startJob(); handleGenerateMenu()}} className="w-[120px] bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">
                      Generate Menu
                    </Button>
                  )}
                </div>
              </form>
            )}

            {loading && (
              <div className="flex justify-center items-center text-gray-700 text-xl font-semibold h-32">
                <div className="loader"></div>
                <div className='flex space-x-2 justify-center items-center dark:invert'>
 	                 <span className='sr-only'>Loading...</span>
  	                 <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
	                   <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
	              <div className='h-8 w-8 bg-black rounded-full animate-bounce'></div>
                </div>

              </div>
              
            )}

            {menuGenerated && !loading && (
              <div className="mt-6">
                <FinalOutput positionInfoList={crewJob.positionInfo} />
                <div className="flex justify-center mt-4 space-x-4">
                  <Button onClick={handleRestart} className="w-[120px] bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700">
                    Restart
                  </Button>
                </div>
              </div>
            )}

            {menuGenerated && (
              <div className="mt-6">
                {/*<EventLog events={crewJob.events} />*/}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}