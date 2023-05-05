// import { combineReducers } from 'redux';
// import {
//   ADD_RECIPE,
//   EDIT_RECIPE,
//   DELETE_RECIPE,
//   SET_CURRENT_USER,
// } from './actions';

// const initialRecipesState = {
//     recipes: [],
//     user: {
//       uid: null,
//       email: null,
//     },
//     error: "",
//     auth: null,
//     ratings: [],
//     comments: {},
//   };
  


// function recipesReducer(state = initialRecipesState, action) {
//   switch (action.type) {
//     case ADD_RECIPE:
//       return { ...state, recipes: [...state.recipes, action.payload] };
//     case EDIT_RECIPE:
//       const newRecipes = state.recipes.map((recipe) =>
//         recipe.id === action.payload.id ? action.payload.recipe : recipe
//       );
//       return { ...state, recipes: newRecipes };
//     case DELETE_RECIPE:
//       const filteredRecipes = state.recipes.filter(
//         (recipe) => recipe.id !== action.payload
//       );
//       return { ...state, recipes: filteredRecipes };
//     default:
//       return state;
//   }
// }

// const initialUserState = {
//   currentUser: null,
// };

// // function userReducer(state = initialUserState, action) {
// //   switch (action.type) {
// //     case SET_CURRENT_USER:
// //       return { ...state, currentUser: action.payload };
// //     default:
// //       return state;
// //   }
// // }

// // const rootReducer = combineReducers({
// //   recipes: recipesReducer,
// //   user: userReducer,
// // });


// // export default rootReducer;


// // const recipesReducer = (state = initialState.recipes, action) => {
// //     switch (action.type) {
// //       case "SET_RECIPES":
// //         return action.payload;
// //       case "ADD_RECIPE":
// //         return [...state, action.payload];
// //       case "UPDATE_RECIPE":
// //         return state.map((recipe) =>
// //           recipe.id === action.payload.id ? action.payload : recipe
// //         );
// //       case "DELETE_RECIPE":
// //         return state.filter((recipe) => recipe.id !== action.payload);
// //       default:
// //         return state;
// //     }
// //   };
  
//   const userReducer = (state = initialState.user, action) => {
//     switch (action.type) {
//       case "SET_USER":
//         return action.payload;
//       case "CLEAR_USER":
//         return {
//           username: null,
//           email: null,
//         };
//       default:
//         return state;
//     }
//   };
  
//   const errorReducer = (state = initialState.error, action) => {
//     switch (action.type) {
//       case "SET_ERROR":
//         return action.payload;
//       case "CLEAR_ERROR":
//         return "";
//       default:
//         return state;
//     }
//   };
  
//   const rootReducer = combineReducers({
//     recipes: recipeReducer,
//     user: userReducer,
//     error: errorReducer,
//     auth: authReducer,
//   });

//   const rootReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case "SET_RECIPES":
//         return {
//           ...state,
//           recipes: action.payload,
//         };
//       case "ADD_RECIPE":
//         return {
//           ...state,
//           recipes: [...state.recipes, action.payload],
//         };
//       case "UPDATE_RECIPE":
//         return {
//           ...state,
//           recipes: state.recipes.map((recipe) =>
//             recipe.id === action.payload.id ? action.payload : recipe
//           ),
//         };
//       case "DELETE_RECIPE":
//         return {
//           ...state,
//           recipes: state.recipes.filter((recipe) => recipe.id !== action.payload),
//         };
//         case "SET_USER":
//           return {
//             ...state,
//             user: {
//               uid: action.payload.uid,
//               email: action.payload.email,
//             },
//           };
//         case "CLEAR_USER":
//           return {
//             ...state,
//             user: {
//               uid: null,
//               email: null,
//             },
//           };
//           case "SET_ERROR":
//             return {
//               ...state,
//               error: action.payload,
//             };
//           case "CLEAR_ERROR":
//             return {
//               ...state,
//               error: "",
//             };
//           case "SET_AUTH":
//             return {
//               ...state,
//               auth: action.payload,
//             };
//             case "ADD_RATING":
//               return {
//                 ...state,
//                 ratings: [
//                   ...state.ratings.filter(
//                     (rating) =>
//                       rating.recipeId !== action.payload.recipeId ||
//                       rating.userId !== state.user.uid
//                   ),
//                   { recipeId: action.payload.recipeId, userId: state.user.uid, value: action.payload.rating },
//                 ],
//               };
//             case "DELETE_RATING":
//               return {
//                 ...state,
//                 ratings: state.ratings.filter(
//                     (rating) =>
//                     rating.recipeId !== action.payload.recipeId ||
//                     rating.userId !== state.user.uid ||
//                     rating.value !== action.payload.rating
//                 ),
//               };
//             case "ADD_COMMENT":
//               return {
//                 ...state,
//                 comments: {
//                   ...state.comments,
//                   [action.payload.recipeId]: [
//                     ...(state.comments[action.payload.recipeId] || []),
//                     {
//                         author: state.user.email,
//                         text: action.payload.comment,
//                         timestamp: new Date(),
//                       },
//                     ],
//                   },
//                 };
//               case "DELETE_COMMENT":
//                 return {
//                   ...state,
//                   comments: {
//                     ...state.comments,
//                     [action.payload.recipeId]: state.comments[
//                       action.payload.recipeId
//                     ].filter((comment) => comment.timestamp !== action.payload.commentId),
//                   },
//                 };
//                 default:
//                     return state;
//                 }
//               };
                                                    
  
//   export default rootReducer;
  


// UPDATED:

import { combineReducers } from 'redux';
import {
  ADD_RECIPE,
  EDIT_RECIPE,
  DELETE_RECIPE,
  SET_CURRENT_USER,
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
    case "SET_RECIPES":
      return action.payload;
    case ADD_RECIPE:
      return [...state, action.payload];
    case EDIT_RECIPE:
      return state.map((recipe) =>
        recipe.id === action.payload.id ? action.payload.recipe : recipe
      );
    case DELETE_RECIPE:
      return state.filter((recipe) => recipe.id !== action.payload);
    default:
      return state;
  }
}

function userReducer(state = initialState.user, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

function errorReducer(state = initialState.error, action) {
  switch (action.type) {
    case "SET_ERROR":
      return action.payload;
    case "CLEAR_ERROR":
      return "";
    default:
      return state;
  }
}

function authReducer(state = initialState.auth, action) {
  switch (action.type) {
    case "SET_AUTH":
      return action.payload;
    default:
      return state;
  }
}

function ratingsReducer(state = initialState.ratings, action) {
  switch (action.type) {
    case "ADD_RATING":
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
    case "DELETE_RATING":
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
    case "ADD_COMMENT":
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
    case "DELETE_COMMENT":
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
