
import React, { useState, useEffect, useRef } from "react";

const Dropdown = ({
  foodTypes,
  countries,
  onFoodSelect,
  onCountrySelect,
  selectedRegion,
  selectedFoodType,
  selectedCountry,
}) => {
  const [foodDropdownVisible, setFoodDropdownVisible] = useState(false);
  const [countryDropdownVisible, setCountryDropdownVisible] = useState(false);

  const foodDropdownRef = useRef(null);
  const countryDropdownRef = useRef(null);

  const toggleFoodDropdown = () => {
    setFoodDropdownVisible((prev) => !prev);
    if (countryDropdownVisible) setCountryDropdownVisible(false);
  };

  const toggleCountryDropdown = () => {
    setCountryDropdownVisible((prev) => !prev);
    if (foodDropdownVisible) setFoodDropdownVisible(false);
  };

  useEffect(() => {
    setFoodDropdownVisible(false);
    setCountryDropdownVisible(false);
  }, [selectedRegion]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        foodDropdownRef.current &&
        !foodDropdownRef.current.contains(event.target) &&
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target)
      ) {
        setFoodDropdownVisible(false);
        setCountryDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFoodSelect = (food) => {
    onFoodSelect(food);
    setFoodDropdownVisible(false);
  };

  const handleCountrySelect = (country) => {
    onCountrySelect(country);
    setCountryDropdownVisible(false);
  };

  return (
    <section className="flex flex-col smd523:flex-row gap-[1rem] relative">
      {/* Food Type Dropdown */}
      <div className="relative" ref={foodDropdownRef} key={selectedRegion}>
        <button
          onClick={toggleFoodDropdown}
          aria-expanded={foodDropdownVisible ? "true" : "false"}
          className="text-white sm375:w-[24rem] sm340:w-[21rem] smd523:w-[15.3rem] w-[17rem] font-KhmerOSBattambang bg-Colorlogo font-KhmerOSBattambang focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center hover:bg-green-500"
        >
          {selectedFoodType}
          <svg
            className="w-2.5 h-2.5 ml-auto"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        {foodDropdownVisible && (
          <div className="absolute z-50 mt-[0.5rem] bg-white divide-y divide-gray-100 rounded-lg shadow sm375:w-[24rem] sm340:w-[21rem] smd523:w-[15.3rem] w-[17rem] max-h-[10rem] overflow-y-auto scrollbar-hide dark:bg-gray-700">
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              {foodTypes.map((food) => (
                <li key={food.type_id}>
                  <button
                    onClick={() => handleFoodSelect(food)}
                    className="block w-full font-KhmerOSBattambang text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    {food.type_name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Country Dropdown */}
      <div className="relative" ref={countryDropdownRef} key={selectedRegion}>
        <button
          onClick={toggleCountryDropdown}
          aria-expanded={countryDropdownVisible ? "true" : "false"}
          className="text-white sm375:w-[24rem] sm340:w-[21rem] smd523:w-[15.3rem] w-[17rem] font-KhmerOSBattambang bg-Colorlogo focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center hover:bg-green-500"
        >
          {selectedCountry}
          <svg
            className="w-2.5 h-2.5 ml-auto"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        {countryDropdownVisible && (
          <div className="absolute z-50 mt-[0.5rem] bg-white divide-y divide-gray-100 rounded-lg shadow sm375:w-[24rem] sm340:w-[21rem] smd523:w-[15.3rem] w-[17rem] max-h-[10rem] overflow-y-auto scrollbar-hide dark:bg-gray-700">
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              {countries.map((country) => (
                <li key={country.country_id}>
                  <button
                    onClick={() => handleCountrySelect(country)}
                    className="block w-full font-KhmerOSBattambang text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    {country.country_name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dropdown;
