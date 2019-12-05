import {
    RECEIVE_DETAILS
  } from "./../constants";

  const initialState = {
      movieData: {}
  }

  function movieDetails (state = initialState, action){
      switch (action.type) {
          case RECEIVE_DETAILS:
              return {
                  ...state, 
                  movieData: action.data
              }
      
          default:
              return state
      }
  }

  export default movieDetails;