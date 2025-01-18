import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(""); 
  const { search } = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(search);
    const searchQuery = queryParams.get("query") || "";

    if (searchQuery) {
      setLoading(true); 
      setErrorMessage(""); 

      fetch(`https://api.bontob.site/api/foods?search=${searchQuery}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch data. Please try again.");
          }
          return response.json();
        })
        .then((data) => {
          const filteredData = data.filter(
            (food) =>
              food.name_food.toLowerCase().includes(searchQuery.toLowerCase()) ||
              food.ingredients.some((ingredient) =>
                ingredient.ingredient_name.toLowerCase().includes(searchQuery.toLowerCase())
              )
          );
          setSearchResults(filteredData);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setErrorMessage(error.message);
          setLoading(false);
        });
    }
  }, [search]);

  if (loading) {
    return <div className="text-center text-lg font-bold mt-10">Loading...</div>;
  }

  return (
    <main className="mt-[4rem] min-h-screen bg-white flex flex-col items-center p-4">
      
      {errorMessage ? (
        <div className="flex items-center justify-center p-4 bg-red-100 border border-red-300 rounded shadow-md my-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-red-500 mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
            />
          </svg>
          <p className="text-red-700 font-medium">{errorMessage}</p>
        </div>
      ) : (
        <div className="grid sm:mt-2 grid-cols-1 smd523:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lgsm:grid-cols-5 gap-4 p-2">
          {searchResults.length > 0 ? (
            searchResults.map((recipe) => (
              <RecipeCard key={recipe.food_id} recipe={recipe} />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-600">
              No results found. Try a different query.
            </p>
          )}
        </div>
      )}
    </main>
  );
};

export default SearchResults;
