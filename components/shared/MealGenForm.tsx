'use client'
import Link from "next/link";
import { useState, useEffect } from "react";
import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

type InputSectionProps = {
  data: string[];
  setData: Dispatch<SetStateAction<string[]>>;
};

type EventType = {
  data: string;
  timestamp: string;
};

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

export default function MealGenForm() {
  const [diet, setDiet] = useState<string>("");
  const [meal_type, setMealType] = useState<string>("");
  const [cuisine, setCuisine] = useState<string>("");
  const [recipe, setRecipe] = useState<string>("");
  const [ingredient, setIngredient] = useState<string>("");
  const [nutrition, setNutrition] = useState<string>("");
  const [goals, setGoals] = useState<string>("");

  const [running, setRunning] = useState<boolean>(false);
  const [events, setEvents] = useState<EventType[]>([]);
  const [positionInfo, setPositionInfoList] = useState<PositionInfo[]>([]);
  const [currentJobId, setCurrentJobId] = useState<string>("");

  const [step, setStep] = useState(1);
  const [menuGenerated, setMenuGenerated] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    let intervalId: number;
    console.log("currentJobId", currentJobId);

    const fetchJobStatus = async () => {
      try {
        console.log("calling fetchJobStatus");
        const response = await axios.get<{
          status: string;
          result: { cuisine: PositionInfo[] };
          events: EventType[];
        }>(`http://localhost:3001/api/crew/${currentJobId}`);
        const { status, events: fetchedEvents, result } = response.data;

        console.log("status update", response.data);

        setEvents(fetchedEvents);
        if (result) {
          console.log("setting job result", result);
          console.log("setting job cuisines", result.cuisine);
          setPositionInfoList(result.cuisine || []);
        }

        if (status === "COMPLETE" || status === "ERROR") {
          if (intervalId) {
            clearInterval(intervalId);
          }
          setRunning(false);
          toast.success(`Job ${status.toLowerCase()}.`);
          if (status === "COMPLETE") {
            setMenuGenerated(true);
            localStorage.setItem("menuData", JSON.stringify(result.cuisine));
            router.push("/final-output");
          }
        }
      } catch (error) {
        if (intervalId) {
          clearInterval(intervalId);
        }
        setRunning(false);
        toast.error("Failed to get menu.");
        console.error(error);
      }
    };

    if (currentJobId !== "") {
      intervalId = setInterval(fetchJobStatus, 5000) as unknown as number;
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [currentJobId, router]);

  const startJob = async () => {
    // Clear previous job data
    setEvents([]);
    setPositionInfoList([]);
    setRunning(true);

    try {
      const response = await axios.post<{ job_id: string }>(
        "http://localhost:3001/api/crew",
        {
          diet,
          meal_type,
          cuisine,
          ingredient,
          nutrition,
          recipe,
          goals,
        }
      );

      toast.success("Menu creation started");

      console.log("jobId", response.data.job_id);
      setCurrentJobId(response.data.job_id);
    } catch (error) {
      toast.error("Failed to create menu");
      console.error(error);
      setCurrentJobId("");
    }
  };

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
        setMenuGenerated(true); // Simulate completion of menu generation
      }, 13000); // 13 seconds loading time

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
      console.log("Form submitted");
    } else {
      console.error("Form validation failed");
    }
  };

  const handleGenerateMenu = () => {
    setLoading(true);
    startJob(); // Start the job here
    // Redirect to new page after 13 seconds is handled in useEffect
  };

  return (
        <div className="flex justify-center items-center min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
          <div className="flex flex-col w-full max-w-lg space-y-4">
            {!menuGenerated && !loading && (
              <form className="flex flex-col space-y-4" onSubmit={handleSubmit} noValidate>
                <div className="text-2xl font-semibold text-center mb-4">Create Your Menu</div>

                {step === 1 && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="diet" className="block text-sm font-medium text-gray-700 mb-1">
                        Select a dietary preference
                      </Label>
                      <Select value={diet} onValueChange={setDiet} required>
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
                      <Select value={meal_type} onValueChange={setMealType} required>
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
                      <Select value={cuisine} onValueChange={setCuisine} required>
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
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="ingredient" className="block text-sm font-medium text-gray-700 mb-1">
                        Specify any specific ingredients you want to include or avoid
                      </Label>
                      <Input
                        type="text"
                        id="ingredient"
                        value={ingredient}
                        onChange={(e) => setIngredient(e.target.value)}
                        placeholder="E.g., chicken, broccoli, no sugar"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="nutrition" className="block text-sm font-medium text-gray-700 mb-1">
                        Enter your nutritional preferences
                      </Label>
                      <Input
                        type="text"
                        id="nutrition"
                        value={nutrition}
                        onChange={(e) => setNutrition(e.target.value)}
                        placeholder="E.g., high protein, low carb"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="recipe" className="block text-sm font-medium text-gray-700 mb-1">
                        Any specific recipes you want to include?
                      </Label>
                      <Input
                        type="text"
                        id="recipe"
                        value={recipe}
                        onChange={(e) => setRecipe(e.target.value)}
                        placeholder="E.g., vegan lasagna, keto salad"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="goals" className="block text-sm font-medium text-gray-700 mb-1">
                        What are your dietary goals?
                      </Label>
                      <Input
                        type="text"
                        id="goals"
                        value={goals}
                        onChange={(e) => setGoals(e.target.value)}
                        placeholder="E.g., weight loss, muscle gain"
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-between mt-6">
                  {step > 1 && (
                    <Button type="button" onClick={prevStep} variant="outline">
                      Previous
                    </Button>
                  )}
                  {step < 3 ? (
                    <Button type="button" onClick={nextStep}>
                      Next
                    </Button>
                  ) : (
                    <Button type="submit" onClick={handleGenerateMenu}>
                      Generate Menu
                    </Button>
                  )}
                </div>
              </form>
            )}

            {loading && (
              <div className="flex flex-col items-center justify-center space-y-4">
              <div className="text-lg font-medium text-gray-700">
                Generating Menu...
              </div>
              <div className='flex space-x-2 justify-center items-center dark:invert'>
                  <span className='sr-only'>Loading...</span>
                   <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                   <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
              <div className='h-8 w-8 bg-black rounded-full animate-bounce'></div>
              </div>
            </div>
            )}

            {menuGenerated && !loading && (
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="text-lg font-medium text-gray-700">
                  Adding Final Touches...
                </div>
                <div className='flex space-x-2 justify-center items-center dark:invert'>
 	                 <span className='sr-only'>Loading...</span>
  	                 <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
	                   <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
	              <div className='h-8 w-8 bg-black rounded-full animate-bounce'></div>
                </div>
              </div>
            )}
          </div>
        </div>
  );
}
