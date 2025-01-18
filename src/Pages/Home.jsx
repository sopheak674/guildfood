import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";
import ScrollableNav from "../components/Scrollable";
import Navbar from "../assets/Navbar";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [foodTypes, setFoodTypes] = useState([]);
  const [selectedFoodType, setSelectedFoodType] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchFoodTypes = async () => {
      try {
        const response = await axios.get(
          "https://api.bontob.site/api/foods/typefoods"
        );
        const allFoods = [
          { type_name: "ទាំងអស់", type_id: null },
          ...response.data,
        ];
        setFoodTypes(allFoods);
      } catch (error) {
        console.error("Error fetching food types:", error);
      }
    };

    fetchFoodTypes();
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const url = searchQuery
          ? `https://api.bontob.site/api/foods?name_food=${searchQuery}`
          : selectedFoodType !== null
          ? `https://api.bontob.site/api/foods?type_id=${selectedFoodType}`
          : "https://api.bontob.site/api/foods";

        const response = await axios.get(url);
        setRecipes(response.data);
        setErrorMessage("");
      } catch (error) {
        console.error("Error fetching recipes:", error);
        if (error.response && error.response.status === 404) {
          setRecipes([]);
          setErrorMessage("No foods found");
        } else {
          setErrorMessage("An error occurred while fetching recipes.");
        }
      }
    };

    fetchRecipes();
  }, [selectedFoodType, searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const navRef = useRef(null);

  const handleScroll = () => {
    navRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className=" bg-white flex flex-col items-center">
      <Navbar onSearch={handleSearch} />{" "}
      <main className="flex flex-col-reverse md:flex-row md:min-h-screen px-[1rem] items-center justify-between py-[5rem] gap-[3rem] md:gap-[2rem] md:py-20">
        <div className="text-center sm425:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            {" "}
            Guild Foods{" "}
          </h1>
          <p className="text-lg text-gray-700 my-4 font-KhmerOSBattambang">
            ស្វែងរកម្ហូបអាហារដែលពេញនិយមជុំវិញពិភពលោក
            នឹង​របៀបចម្អិនអាហារដ៏ឈ្ងុយឆ្ញាញ់ទាំងនោះ
          </p>
          <button
            className="bg-Colorlogo text-white px-5 py-2 font-KhmerOSBattambang rounded hover:bg-green-300"
            onClick={handleScroll}
          >
            ចាប់ផ្ដើមឥឡូវនេះ
          </button>
        </div>

        <div className="flex-shrink-0 lg:w-[40rem] sm:w-[30rem]">
          <img src="images/Cover.jpg" alt="Healthy Food" className="rounded" />
        </div>
      </main>
      <section ref={navRef}>
        <div className="mt-[5rem]">
          <ScrollableNav
            items={foodTypes.map((foodType) => ({
              title: foodType.type_name,
              id: foodType.type_id,
            }))}
            title="ប្រភេទនៃអាហារ"
            subtitle="គ្រប់មុខប្ហូបទាំងអស់ដែលពេញនិយមនៅលើពិភពលោកត្រូវបានបែងចែកទៅតាមប្រភេទនីមួយៗ"
            onItemClick={(typeId) => setSelectedFoodType(typeId)}
          />
        </div>
      </section>
      <section>
        <div className="grid sm:mt-2  grid-cols-1 smd523:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lgsm:grid-cols-5 gap-4 p-2">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
        {errorMessage && (
          <div className="flex items-center justify-center p-4 bg-red-100 border border-red-300 rounded shadow-md my-4">
            <p className="text-red-700 font-medium">{errorMessage}</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
