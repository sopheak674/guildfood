import React from "react";
import { useNavigate } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/food/${recipe.name_food}`, { state: recipe });
  };

  return (
    <div
      className="border sm:mt-0 mt-[1rem] rounded-lg p-4 sm375:w-[24rem] sm340:w-[21rem] smd523:w-[15.3rem] w-[17rem] shadow"
      onClick={handleClick}
    >
      <img
        src={recipe.food_image}
        alt={recipe.name_food}
        className="w-full h-[7rem] object-cover rounded-md"
      />
      <h3 className="mt-4 font-bold font-KhmerOSBattambang ">
        {recipe.name_food}
      </h3>
      <p
        className="text-gray-600 mt-[5px] font-KhmerOSBattambang truncate"
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {recipe.description}
      </p>
    </div>
  );
};

export default RecipeCard;
