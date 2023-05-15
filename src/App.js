import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import RecipeDetail from './components/RecipeDetail';
import RecipeForm from './components/RecipeForm';
import RecipeComments from './components/RecipeComments';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './components/Profile';
// import Recipes from './pages/Recipes';

function Upload() {
  const user = useSelector((state) => state.user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <RecipeForm />;
}

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/recipes" element={<Recipes />} /> */}
          <Route path="/recipes/:id" element={<RecipeDetail />} />
          <Route path="/recipes/:id/comments" element={<RecipeComments />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
