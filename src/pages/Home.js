import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRecipes } from "../redux/actions";
import RecipeList from "../components/RecipeList";
import "../styles/home.css";
import { firestore } from "../firebase";
import { collection, onSnapshot, query } from "firebase/firestore";


const Home = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedCategory] = useState("");
  const [timeFilter, setTimeFilter] = useState("");
  const [servingFilter, setServingFilter] = useState("");
  const [veganFilter, setVeganFilter] = useState(false);

  useEffect(() => {
    const recipesRef = collection(firestore, "recipes");
    const unsubscribe = onSnapshot(query(recipesRef), (snapshot) => {
      const recipes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(setRecipes(recipes));
      setFilteredRecipes(recipes);
    });
    return unsubscribe;
  }, [dispatch]);

  const handleSearch = (searchText = '', category, time, servings, isVegan) => {
    let filtered = recipes;
  
    if (searchText) {
      filtered = filtered.filter((recipe) => recipe.title.toLowerCase().includes(searchText.toLowerCase()));
    }
  
    if (category) {
      filtered = filtered.filter((recipe) => recipe.category === category);
    }
  
    if (time) {
      filtered = filtered.filter((recipe) => recipe.time === time);
    }
  
    if (servings) {
      filtered = filtered.filter((recipe) => recipe.servings === servings);
    }
  
    if (isVegan) {
      filtered = filtered.filter((recipe) => recipe.isVegan);
    }
  
    setFilteredRecipes(filtered);
  };
  

  return (
    <div className="home">
      <div className="container">
        <h1 className="heading">Share a dish recipes</h1>
        <div className="search-bar-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Search"
            onChange={(e) => handleSearch(e.target.value, selectedCategory, timeFilter, servingFilter)}
          />
          
          <select
            className="time-select"
            value={timeFilter}
            onChange={(e) => {
              setTimeFilter(e.target.value);
              handleSearch('', selectedCategory, e.target.value, servingFilter);
            }}
          >
            <option value="">Search by time</option>
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="45">45 minutes</option>
            <option value="60">1 hour</option>
            <option value="90">1 hour 30 minutes</option>
            <option value="120">2 hours</option>
          </select>
          <select
            className="serving-select"
            value={servingFilter}
            onChange={(e) => {
            setServingFilter(e.target.value);
            handleSearch('', selectedCategory, timeFilter, e.target.value);
            }}
          >
            <option value="">Search by servings</option>
            <option value="1">1 serving</option>
            <option value="2">2 servings</option>
            <option value="4">4 servings</option>
            <option value="6">6 servings</option>
            <option value="8">8 servings</option>
          </select>
          <label className="vegan-label">
          <input
            type="checkbox"
            className="vegan-checkbox"
            checked={veganFilter}
            onChange={(e) => {
              setVeganFilter(e.target.checked);
              handleSearch('', selectedCategory, timeFilter, servingFilter, e.target.checked);
            }}
          />
          Vegan
        </label>

        </div>
        <RecipeList className="recipe-list" recipes={filteredRecipes} />
      </div>
  </div>
  );
};

export default Home;
