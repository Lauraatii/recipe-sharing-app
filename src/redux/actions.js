export const ADD_RECIPE = 'ADD_RECIPE';
export const EDIT_RECIPE = 'EDIT_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export function addRecipe(recipe) {
  return { type: ADD_RECIPE, payload: recipe };
}

export function editRecipe(id, recipe) {
  return { type: EDIT_RECIPE, payload: { id, recipe } };
}

export function deleteRecipe(id) {
  return { type: DELETE_RECIPE, payload: id };
}

export function setCurrentUser(user) {
  return { type: SET_CURRENT_USER, payload: user };
}

export const setRecipes = (recipes) => {
  return {
    type: "SET_RECIPES",
    payload: recipes,
  };
};

export const updateRecipe = (recipe) => {
  return {
    type: "UPDATE_RECIPE",
    payload: recipe,
  };
};

export const setUser = (user) => {
  return {
    type: "SET_USER",
    payload: user,
  };
};

export const clearUser = () => {
  return {
    type: "CLEAR_USER",
  };
};

export const setError = (error) => {
  return {
    type: "SET_ERROR",
    payload: error,
  };
};

export const clearError = () => {
  return {
    type: "CLEAR_ERROR",
  };
};

export const setAuth = (auth) => ({
  type: "SET_AUTH",
  payload: auth,
});

export const addRating = (recipeId, rating) => {
  return {
    type: "ADD_RATING",
    payload: {
      recipeId,
      rating,
    },
  };
};

export const deleteRating = (recipeId, rating) => {
  return {
    type: "DELETE_RATING",
    payload: {
      recipeId,
      rating,
    },
  };
};

export const addComment = (recipeId, comment) => {
  return {
    type: "ADD_COMMENT",
    payload: {
      recipeId,
      comment,
    },
  };
};

export const deleteComment = (recipeId, commentId) => {
  return {
    type: "DELETE_COMMENT",
    payload: {
      recipeId,
      commentId,
    },
  };
};
