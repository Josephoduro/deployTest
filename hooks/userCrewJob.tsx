"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export type EventType = {
  data: string;
  timestamp: string;
};

export type NameCalorie = {
  ingredients: string;
  calorie: string;
};

export type PositionInfo = {
  Dish: string;
  Ingredients: string;
  Recipe: string;
  Total_Calories: NameCalorie[];
};

export const useCrewJob = () => {
  // State
  const [running, setRunning] = useState<boolean>(false);
  const [diet, setDiet] = useState<string>("");
  const [meal_type, setMealType] = useState<string>("");
  const [cuisine, setCuisine] = useState<string>("");
  const [recipe, setRecipe] = useState<string>("");
  const [ingredient, setIngredient] = useState<string>("");
  const [nutrition, setNutrition] = useState<string>("");
  const [goals, setGoals] = useState<string>("");
  const [events, setEvents] = useState<EventType[]>([]);
  const [positionInfo, setPositionInfoList] = useState<PositionInfo[]>([]);
  const [currentJobId, setCurrentJobId] = useState<string>("");

  // useEffects
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
  }, [currentJobId]);

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

  return {
    running,
    events,
    setEvents,
    positionInfo,
    setPositionInfoList,
    currentJobId,
    setCurrentJobId,
    diet,
    setDiet,
    meal_type,
    setMealType,
    cuisine,
    setCuisine,
    ingredient,
    setIngredient,
    nutrition,
    setNutrition,
    recipe,
    setRecipe,
    goals,
    setGoals,
    startJob,
  };
};