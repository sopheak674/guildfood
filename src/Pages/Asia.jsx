import React, { useState, useEffect } from "react";
import axios from "axios";
import Dropdown from "../components/dropdown";
import RecipeCard from "../components/RecipeCard";
import ScrollableNav from "../components/Scrollable";

function Asia() {
  const [recipes, setRecipes] = useState([]);
  const [regionNames, setRegionNames] = useState([]);
  const [countries, setCountries] = useState([]); 
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [foodTypes, setFoodTypes] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  const [selectCountries, setSelectCountries] = useState(null); 
  const continentId = 1;
  const [isDropdownOpen, setIsDropdownOpen] = useState(true); 

  useEffect(() => {
    const fetchRegionNames = async () => {
      try {
        const response = await axios.get(
          "https://api.bontob.site/api/countrys/regions"
        );
        const filteredRegions = response.data
          .filter((region) => region.continent?.continent_id === continentId)
          .map((region) => ({
            region_name: region.region_name,
            region_id: region.region_id,
          }));

        const allRegions = [
          { region_name: "ទាំងអស់", region_id: null },
          ...filteredRegions,
        ];
        setRegionNames(allRegions); 
      } catch (error) {
        console.error("Error fetching region names:", error);
        setErrorMessage("Failed to fetch regions. Please try again later.");
      }
    };

    fetchRegionNames();
  }, [continentId]); 
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        let url = `https://api.bontob.site/api/foods?`;

        if (selectedRegion !== null && selectedRegion !== "ទាំងអស់") {
          url += `region_id=${selectedRegion}&`;
        }

        if (continentId !== null) {
          url += `continent_id=${continentId}&`;
        }

        if (selectedType !== null && selectedType !== "ទាំងអស់") {
          url += `type_id=${selectedType}&`;
        }

        if (selectCountries !== null && selectCountries !== "ទាំងអស់") {
          url += `country_id=${selectCountries}`;
        }

        const response = await axios.get(url);

        if (response.data && response.data.length === 0) {
          setRecipes([]); 
          setErrorMessage("No foods found.");
        } else {
          setRecipes(response.data); 
          setErrorMessage(""); 
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
        if (error.response && error.response.status === 404) {
          setRecipes([]); 
          setErrorMessage("No foods found.");
        } else {
          setErrorMessage("An error occurred while fetching recipes.");
        }
      }
    };

    fetchRecipes();
  }, [selectedRegion, continentId, selectedType, selectCountries]); 

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://api.bontob.site/api/countrys");
        const countriesData = response.data.map((country) => ({
          country_name: country.country_name,
          country_id: country.country_id,
          region_id: country.region?.region_id,
          continent_id: country.region?.continent?.continent_id, 
        }));

        setCountries(countriesData); 
      } catch (error) {
        console.error("Error fetching countries:", error);
        setErrorMessage("Failed to fetch countries. Please try again later.");
      }
    };

    fetchCountries();
  }, []); 

  useEffect(() => {
    if (selectedRegion !== null) {
      const filtered = countries.filter(
        (country) => country.region_id === selectedRegion
      );
      setFilteredCountries(filtered);
    } else {
      const filteredByContinent = countries.filter(
        (country) => country.continent_id === continentId
      );
      setFilteredCountries(filteredByContinent);
    }
  }, [selectedRegion, countries, continentId]); 

  useEffect(() => {
    const fetchFoodTypes = async () => {
      try {
        const response = await axios.get(
          "https://api.bontob.site/api/foods/typefoods"
        );
        const foodTypesData = response.data.map((food) => ({
          type_id: food.type_id,
          type_name: food.type_name,
        }));

        setFoodTypes(foodTypesData); 
      } catch (error) {
        console.error("Error fetching food types:", error);
        setErrorMessage("Failed to fetch food types. Please try again later.");
      }
    };

    fetchFoodTypes();
  }, []); 

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        let url = `https://api.bontob.site/api/foods?`;
        if (
          selectedRegion &&
          selectedRegion !== "ទាំងអស់" &&
          selectedRegion !== null
        ) {
          url += `region_id=${selectedRegion}&`;
        } else if (selectedRegion === null || selectedRegion === "ទាំងអស់") {
          url += `continent_id=${continentId}&`;
        }

        if (selectedType && selectedType !== "ទាំងអស់") {
          url += `type_id=${selectedType}&`;
        }

        if (selectCountries && selectCountries !== "ទាំងអស់") {
          url += `country_id=${selectCountries}`;
        }

        const response = await axios.get(url);

        if (response.data && response.data.length === 0) {
          setRecipes([]); 
          setErrorMessage("No foods found.");
        } else {
          setRecipes(response.data); 
          setErrorMessage(""); 
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
        if (error.response && error.response.status === 404) {
          setRecipes([]); 
          setErrorMessage("No foods found.");
        } else {
          setErrorMessage("An error occurred while fetching recipes.");
        }
      }
    };

    fetchRecipes();
  }, [selectedRegion, continentId, selectedType, selectCountries]);

  const [selectedFoodType, setSelectedFoodType] = useState("ប្រភេទអាហារ");
  const [selectedCountry, setSelectedCountry] = useState("ប្រទេស");

  return (
    <main className="min-h-screen mt-[2rem] bg-white flex flex-col items-center">
      <section className="py-6">
        <div>
          <ScrollableNav
            items={regionNames.map((region) => ({
              title: region.region_name,
              id: region.region_id,
            }))}
            title="Regions of Asia"
            subtitle="Explore the popular food regions of Asia!"
            onItemClick={(regionId) => {
              setSelectedRegion(regionId);
              setSelectedType(null);
              setSelectCountries(null); 
              setIsDropdownOpen(true);
              setSelectedFoodType("ប្រភេទអាហារ"); 
              setSelectedCountry("ប្រទេស"); 
            }}
          />
        </div>
      </section>

      <section>
        <div>
          <Dropdown
            foodTypes={foodTypes}
            countries={filteredCountries}
            onFoodSelect={(food) => {
              setSelectedFoodType(food.type_name); 
              setSelectedType(food.type_id);
              setIsDropdownOpen(false); 
            }}
            onCountrySelect={(country) => {
              setSelectCountries(country.country_id); 
              setSelectedCountry(country.country_name); 
              setIsDropdownOpen(false); 
            }}
            selectedFoodType={selectedFoodType}
            selectedCountry={selectedCountry}
            isOpen={isDropdownOpen}
            onClose={() => setIsDropdownOpen(false)}
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
        )}
      </section>
    </main>
  );
}

export default Asia;
