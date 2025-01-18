import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import "../index.css";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      fetch(`https://api.bontob.site/api/foods?search=${searchQuery}`)
        .then((response) => response.json())
        .then((data) => {
          const filteredSuggestions = data
            .filter(
              (food) =>
                food.name_food
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                food.ingredients.some((ingredient) =>
                  ingredient.ingredient_name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
                )
            )
            .map((food) => ({ name: food.name_food }));
          setSearchSuggestions(filteredSuggestions);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      setSearchSuggestions([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSearchSuggestions([]);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search?query=${searchQuery}`);
      setSearchSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    navigate(`/search?query=${suggestion.name}`);
    setSearchSuggestions([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (searchSuggestions.length > 0) {
        navigate(`/search?query=${searchSuggestions[0].name}`);
      } else if (searchQuery.trim() !== "") {
        navigate(`/search?query=${searchQuery}`);
      }
      setSearchSuggestions([]);
      e.preventDefault();
    }
  };

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const [showForm, setShowForm] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow py-4 px-4 w-full z-50">
      <div className="container mx-auto flex justify-between items-center ">
        <div>
          <Link to="/" className="flex flex-row item-center justify-center">
            <img
              src="/logo.png"
              alt="Healthy Food"
              className="rounded"
              width={35}
              height={5}
            />
            <h1 className="text-lg mt-[5px] text-Colorlogo font-bold w-[25rem]  md:w-[10rem] font-bold sm:w-[7rem]">
              Guild Foods
            </h1>
          </Link>{" "}
        </div>

        {/* Search bar (desktop) */}
        <div className="relative max-lg:w-[25rem] " ref={dropdownRef}>
          <form
            onSubmit={handleSearchSubmit}
            className="flex lg:w-[27rem] md:w-[25rem] sm:w-[23rem] max-sm:hidden"
          >
            <input
              className="border font-KhmerOSBattambang border-Colorlogo w-full h-10 rounded-l-full px-4 outline-none focus:border-Colorlogo"
              type="search"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-[5rem] top-1/2 transform -translate-y-1/2 text-Colorlogo"
              >
                X
              </button>
            )}
            <button
              type="submit"
              className="bg-Colorlogo text-white border border-Colorlogo px-5 rounded-r-full hover:bg-green-500"
            >
              <Search />
            </button>
          </form>

          {/* Suggestions dropdown */}
          {searchQuery && searchSuggestions.length > 0 && (
            <div className="absolute bg-white shadow-lg mt-2 w-full rounded-lg overflow-y-auto max-h-60 z-10 max-sm:hidden">
              <ul>
                {searchSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 font-KhmerOSBattambang hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Mobile search toggle */}
        <button
          className="text-Colorlogo hover:text-black sm:hidden"
          onClick={() => setShowForm(true)}
        >
          <Search />
        </button>

        {/* Mobile menu */}
        <div className="relative lg:hidden block">
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-Colorlogo rounded-lg lg:hidden hover:bg-[#008940] hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded={isMenuOpen}
            onClick={handleMenuToggle}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          {/* Overlay */}
          <div
            className={`menu-overlay ${isMenuOpen ? "active" : ""}`}
            onClick={handleMenuToggle}
          ></div>

          {/* Menu items */}
          <div className={`menu ${isMenuOpen ? "active" : ""}`}>
            <button
              type="button"
              className="menu-close-button"
              onClick={handleMenuToggle}
            >
              <svg
                className="w-6 h-6 text-white dark:text-white hover:text-black"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"
                />
              </svg>
              <p>Menu</p>
            </button>
            <span className="w-[15rem] mt-[1rem] ml-[-1rem] bg-white h-[3px]" />
            <Link to="/" onClick={handleMenuToggle}>
              <p className="menu-item underlines-hover font-bold">Home</p>
            </Link>
            <Link to="/Asia" onClick={handleMenuToggle}>
              <p className="text-white underlines-hover font-bold">
                Asia Foods
              </p>
            </Link>
            <Link to="/Europe" onClick={handleMenuToggle}>
              <p className="text-white underlines-hover font-bold">
                Europe Food
              </p>
            </Link>
            <Link to="/Aboutus" onClick={handleMenuToggle}>
              <p className="text-white underlines-hover font-bold">About Us</p>
            </Link>
          </div>
        </div>

        {/* Desktop menu */}
        <div className="hidden lg:flex md:space-x-4">
          <Link to="/">
            <p className="text-Colorlogo underline-hover font-bold">Home</p>
          </Link>
          <Link to="/Asia">
            <p className="text-Colorlogo underline-hover font-bold">
              Asia Foods
            </p>
          </Link>
          <Link to="/Europe">
            <p className="text-Colorlogo underline-hover font-bold">
              Europe Foods
            </p>
          </Link>
          <Link to="/Aboutus">
            <p className="text-Colorlogo underline-hover font-bold">About Us</p>
          </Link>
        </div>
      </div>

      <div>
        {showForm && (
          <div
            ref={dropdownRef}
            className="fixed top-0 left-0 w-full z-50 bg-white py-4 flex "
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setShowForm(false)} // Close the search form
              className=" text-Colorlogo hover:text-black p-2 rounded-full focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
            </button>
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center w-full font-KhmerOSBattambang"
            >
              <input
                className="border border-Colorlogo ​​​ w-full h-10 rounded-l-full px-4 outline-none"
                type="search"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="bg-Colorlogo text-white border border-Colorlogo px-5 py-2 rounded-r-full hover:bg-green-500"
              >
                <Search />
              </button>
            </form>

            {/* Suggestions dropdown */}
            {searchQuery && searchSuggestions.length > 0 && (
              <div className="absolute bg-white shadow-lg mt-[3rem] w-full rounded-lg overflow-y-auto max-h-60 z-10 sm:hidden block">
                <ul>
                  {searchSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="ml-[3.5rem] py-2 font-KhmerOSBattambang hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
