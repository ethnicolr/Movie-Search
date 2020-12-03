import React, { useEffect, useState, useReducer, useRef } from 'react'

import {
    fetchMovieType,
    getMovies,
    Options,
    MoviesResult,
  } from '../api/movieApi'

  export function usePrevious<T>(value: T) {
    const ref = useRef<T>();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current as T;
  }