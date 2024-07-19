import React, { useState, useEffect } from 'react';

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strInstructions: string;
  strYoutube: string;
}

interface MealSearchProps {
  initialSearchInput?: string;
}

const MealSearch: React.FC<MealSearchProps> = ({ initialSearchInput = '' }) => {
  const [searchInput, setSearchInput] = useState<string>(initialSearchInput);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

  useEffect(() => {
    if (initialSearchInput) {
      getMealList(initialSearchInput);
    }
  }, [initialSearchInput]);

  const getMealList = async (query: string) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`);
    const data = await response.json();
    if (data.meals) {
      setMeals(data.meals);
    } else {
      setMeals([]);
    }
  };

  const getMealRecipe = async (id: string) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    if (data.meals) {
      setSelectedMeal(data.meals[0]);
    }
  };

  const closeRecipe = () => {
    setSelectedMeal(null);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto p-8 bg-white text-center">
        <div className="my-8">
          <h2 className="text-2xl mb-4">Find Meals For Your Ingredients</h2>
          <blockquote className="text-base">
            Real food does not have ingredients, real food is ingredients.<br />
            <cite>- Jamie Oliver</cite>
          </blockquote>

          <div className="my-4 flex justify-center items-stretch">
            <input
              type="text"
              className="w-full p-4 text-lg border border-[#d65108] text-[#d65108] rounded-l-full"
              placeholder="Enter an ingredient"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button
              type="button"
              className="w-14 h-14 text-2xl bg-[#d65108] text-white rounded-r-full transition duration-400 hover:bg-[#b54507]"
              onClick={() => getMealList(searchInput)}
            >
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl mb-4">Your Search Results:</h2>
          <div id="meal" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {meals.length > 0 ? (
              meals.map((meal) => (
                <div key={meal.idMeal} className="meal-item rounded-lg overflow-hidden shadow-lg">
                  <div className="meal-img">
                    <img src={meal.strMealThumb} alt={meal.strMeal} />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold">{meal.strMeal}</h3>
                    <p className="text-gray-700">{meal.strCategory}</p>
                    <button
                      onClick={() => getMealRecipe(meal.idMeal)}
                      className="mt-2 bg-[#d65108] text-white px-4 py-2 rounded-full"
                    >
                      View Recipe
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No meals found</p>
            )}
          </div>
        </div>

        {selectedMeal && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-lg max-w-3xl w-full text-left">
              <h2 className="text-2xl font-bold mb-4">{selectedMeal.strMeal}</h2>
              <img src={selectedMeal.strMealThumb} alt={selectedMeal.strMeal} className="mb-4" />
              <p className="mb-4">{selectedMeal.strInstructions}</p>
              <button
                onClick={closeRecipe}
                className="mt-2 bg-[#d65108] text-white px-4 py-2 rounded-full"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealSearch;
