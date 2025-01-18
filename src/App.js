import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./assets/Navbar";
import Home from "./Pages/Home";
import Asia from "./Pages/Asia";
import FoodDetail from "./assets/FoodDetail";
import Europe from "./Pages/Europe";
import Footer from "./assets/Footer";
import SearchResults from "./assets/SearchResults"; 
import AboutUs from "./Pages/about"; 

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/food/:id" element={<FoodDetail />} />
        <Route path="/" element={<Home />} />
        <Route path="/Asia" element={<Asia />} />
        <Route path="/food/:name_food" element={<FoodDetail />} />
        <Route path="/Europe" element={<Europe />} />
        <Route path="/search" element={<SearchResults />} /> 
        <Route path="/aboutus" element={<AboutUs />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
