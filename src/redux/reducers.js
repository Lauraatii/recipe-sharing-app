import { combineReducers } from 'redux';
import {
  ADD_RECIPE,
  EDIT_RECIPE,
  DELETE_RECIPE,
  SET_CURRENT_USER,
  SET_RECIPES,
  UPDATE_RECIPE,
  SET_USER,
  CLEAR_USER,
  SET_ERROR,
  CLEAR_ERROR,
  SET_AUTH,
  ADD_RATING,
  DELETE_RATING,
  ADD_COMMENT,
  DELETE_COMMENT,
  USER_LOGOUT,
} from './actions';

const initialState = {
  recipes: [],
  user: {
    uid: null,
    email: null,
  },
  error: "",
  auth: null,
  ratings: [],
  comments: {},
};

function recipesReducer(state = initialState.recipes, action) {
  switch (action.type) {
    case SET_RECIPES:
      return action.payload;
    case ADD_RECIPE:
      return [...state, action.payload];
    case EDIT_RECIPE:
      return state.map((recipe) =>
        recipe.id === action.payload.id ? action.payload.recipe : recipe
      );
    case DELETE_RECIPE:
      return state.filter((recipe) => recipe.id !== action.payload);
    case UPDATE_RECIPE:
      return state.map((recipe) =>
        recipe.id === action.payload.id ? { ...recipe, ...action.payload } : recipe
      );
    default:
      return state;
  }
}

function userReducer(state = initialState.user, action) {
  switch (action.type) {
    case SET_USER:
    case SET_CURRENT_USER:
      return { ...state, ...action.payload };
    case CLEAR_USER:
    case USER_LOGOUT:
      return { uid: null, email: null };
    default:
      return state;
  }
}

function errorReducer(state = initialState.error, action) {
  switch (action.type) {
    case SET_ERROR:
      return action.payload;
    case CLEAR_ERROR:
      return "";
    default:
      return state;
  }
}

function authReducer(state = initialState.auth, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.payload;
    default:
      return state;
  }
}

function ratingsReducer(state = initialState.ratings, action) {
  switch (action.type) {
    case ADD_RATING:
      return [
        ...state.filter(
          (rating) =>
            rating.recipeId !== action.payload.recipeId ||
            rating.userId !== initialState.user.uid
        ),
        {
          recipeId: action.payload.recipeId,
          userId: initialState.user.uid,
          value: action.payload.rating,
        },
      ];
    case DELETE_RATING:
      return state.filter(
        (rating) =>
          rating.recipeId !== action.payload.recipeId ||
          rating.userId !== initialState.user.uid ||
          rating.value !== action.payload.rating
      );
    default:
      return state;
  }
}

function commentsReducer(state = initialState.comments, action) {
  switch (action.type) {
    case ADD_COMMENT:
      return {
        ...state,
        [action.payload.recipeId]: [
          ...(state[action.payload.recipeId] || []),
          {
            author: initialState.user.email,
            text: action.payload.comment,
            timestamp: new Date(),
          },
        ],
      };
    case DELETE_COMMENT:
      return {
        ...state,
        [action.payload.recipeId]: state[action.payload.recipeId].filter(
          (comment) => comment.timestamp !== action.payload.commentId
        ),
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  recipes: recipesReducer,
  user: userReducer,
  error: errorReducer,
  auth: authReducer,
  ratings: ratingsReducer,
  comments: commentsReducer,
});

export default rootReducer;
