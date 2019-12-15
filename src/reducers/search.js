import {RECEIVE_SEARCH, CLEAR_SEARCH } from './../constants';

const initialState ={
    results: []
}

export default function search(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_SEARCH: return {
            ...state, 
            results: action.results.slice(0, 5)
        }

        case CLEAR_SEARCH: return {
            ...state,
            results: []
          }
            
        default:
            return state
    }
}