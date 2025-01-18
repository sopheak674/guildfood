import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";

const FoodDetail = () => {
  const { state } = useLocation();
  const [relatedRecipes, setRelatedRecipes] = useState([]);

  const {
    food_image,
    name_food,
    description,
    ingredients = [],
    how,
    country,
    type_foods,
    note,
    dependency,
  } = state || {}; 

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const fetchRelatedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://api.bontob.site/api/foods?type_id=${type_foods?.type_id}`
        );
        setRelatedRecipes(response.data);
      } catch (error) {
        console.error("Error fetching related recipes:", error);
      }
    };

    if (type_foods?.type_id) {
      fetchRelatedRecipes();
    }
  }, [type_foods]);

  if (!state) {
    return <p>No food details found</p>;
  }

  const handleGridClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="mt-[1rem] min-h-screen bg-white flex flex-col items-center p-4">
      <section className="container mt-[5rem] mx-auto w-[80rem] w- flex flex-col md:flex-row gap-[3rem]">
        <div className="mb-[0.5rem]">
          <img
            src={food_image}
            alt={name_food}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-xl font-bold font-KhmerOSBattambang mb-4">
            {name_food}
          </h1>
          <p className="text-black font-KhmerOSBattambang mb-4">
            {description}
          </p>

          <div className="mb-[1rem] flex font-KhmerOSBattambang mb-3">
            <p className="font-bold">ប្រទេស ៖</p>
            <p className="ml-1">{country?.country_name || "N/A"} {dependency?.duplicate_dependency_id}</p>
          </div>

          <div className="mb-[1rem] flex font-KhmerOSBattambang mb-3">
            <p className="font-bold">ប្រភេទ ៖</p>
            <p className="ml-1">{type_foods?.type_name || "N/A"}</p>
          </div>

          <div className="mb-[1rem] font-KhmerOSBattambang mb-3​">
            <p className="font-bold mb-[5px]">គ្រឿងផ្សំ ៖​</p>
            <ul>
              {ingredients.map((ingredient, index) => (
                <span key={index}>
                  {ingredient.ingredient_name}
                  {index < ingredients.length - 1 && ", "}
                </span>
              ))}
            </ul>
          </div>

          <div className="mb-[1rem] font-KhmerOSBattambang mb-3​">
            <p className="font-bold mb-[5px]">របៀបចម្អិន ៖​</p>
            <p className="text-black font-KhmerOSBattambang">{how}</p>
          </div>

          <div className="mb-[1rem] font-KhmerOSBattambang mb-3">
            {note && (
              <>
                <p className="font-bold mb-[5px]">កំណត់ចំណាំ ៖​</p>
                <p className="text-black font-KhmerOSBattambang">{note}</p>
              </>
            )}
          </div>
        </div>
      </section>
      <section>
        <nav className="mt-8 ">
          <h2 className="text-lg font-bold font-KhmerOSBattambang">
            មុខម្ហូបស្រដៀងគ្នា
          </h2>
          <div
            className="grid sm:mt-2 grid-cols-1 smd523:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lgsm:grid-cols-5 gap-4"
            onClick={handleGridClick} 
          >
            {relatedRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </nav>
      </section>
    </main>
  );
};

export default FoodDetail;
