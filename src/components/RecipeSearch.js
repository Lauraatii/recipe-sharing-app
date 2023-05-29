import React, { useState } from 'react';


const RecipeSearch = ({ handleSearch }) => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');


  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };


  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(keyword, category);
};


return (
  <form onSubmit={handleSubmit}>
    <div className="form-group">
    <input
    type="text"
    className="form-control"
    placeholder="Search by keyword"
    value={keyword}
    onChange={handleKeywordChange}
    />
    </div>
    <div className="form-group">
    <select
    className="form-control"
    value={category}
    onChange={handleCategoryChange}
    >
    <option value="">Search by category</option>
    <option value="Appetizers">Appetizers</option>
    <option value="Main Dishes">Main Dishes</option>
    <option value="Desserts">Desserts</option>
    <option value="Drinks">Drinks</option>
    </select>
    </div>
          <button type="submit" className="btn btn-primary">
            Search
          </button>
    </form>
  );
};


export default RecipeSearch;
