import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
// import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import RecipeForm from './components/RecipeForm';
import Footer from './components/Footer';
import Login from './pages/Login'; 
import Register from './pages/Register'; 
import Recipes from './pages/Recipes';


function App() {
  return (
    <Router>
    <div className="App">
    <Header />
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/recipes" element={<Recipes />} />
      <Route exact path="/recipes/:id" element={<RecipeDetail />} />
      <Route exact path="/upload" element={<RecipeForm />} />
      <Route exact path="/login" element={<Login />} /> 
      <Route exact path="/register" element={<Register />} />
    </Routes>
    <Footer />
    </div>
</Router>

  );
}

export default App;
