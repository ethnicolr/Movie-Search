import axios from 'axios'
export const API_KEY = 'api_key=33691dc9097a0a10121b027c1856edd7'

export interface Details {
  id: string
  title: string
  vote_average: number
  poster_path: string | null
  overview: string
  tagline: string
  release_date: string
  first_air_date: string
  genres: [{ name: string; id: string }]
  runtime: number
  episode_run_time: number
  name: string
  production_countries: [{ name: string }]
  media_type?: string
  budget: number
}

export interface MovieType {
  id: string
  title: string
  vote_average: number
  poster_path: string | null
  release_date: string
  first_air_date: string
  name: string
  media_type: string
}

export interface MoviesResult {
  page: number
  totalPages: number
  moviesList: MovieType[]
}

export interface Options {
  search?: string
  page?: number
  genres?: string[]
  sortBy?: string
  movieId?: string
}

export interface Genre {
  id: string
  name: string
  selected: boolean
}


interface GenresProps {
  genres: Genre[]
}


export const getUrl = {
  '/search': (options: Options): string =>
    `https://api.themoviedb.org/3/search/multi?&${API_KEY}&query=${options.search}&page=${options.page}`,
  '/top_rated': (options: Options): string =>
    `https://api.themoviedb.org/3/movie/top_rated?&${API_KEY}&page=${options.page}`,
  '/upcoming': (options: Options): string =>
    `https://api.themoviedb.org/3/movie/upcoming?&${API_KEY}&page=${options.page}`,
  '/popular': (options: Options): string =>
    `https://api.themoviedb.org/3/movie/popular?&${API_KEY}&page=${options.page}`,
  '/': (options: Options): string =>
    `https://api.themoviedb.org/3/movie/popular?&${API_KEY}&page=${options.page}`,
  '/movie': (options: Options): string =>
    `https://api.themoviedb.org/3/movie/${options.movieId}?&${API_KEY}&language=en-US`,
  '/tv': (options: Options): string =>
    `https://api.themoviedb.org/3/tv/${options.movieId}?&${API_KEY}&language=en-US`,
  '/filter': (options: Options): string =>
    `https://api.themoviedb.org/3/discover/movie?&${API_KEY}&language=en-US&sort_by=${options.sortBy}&include_adult=false&include_video=false&page=${options.page}&with_genres=${options.genres}`,
  '/credits': (options: Options): string =>
    `https://api.themoviedb.org/3/movie/${options.movieId}/credits?&${API_KEY}&language=en-US`,
  '/similar': (options: Options): string =>
    `https://api.themoviedb.org/3/movie/${options.search}/similar?&${API_KEY}&language=en-USpage=1`,
}


export type fetchMovieType = keyof typeof getUrl

export type pathnameType = keyof typeof getUrl | '/favorite'

interface Cast {
  id: number
  name: string
}

export interface DetailsResult {
  movieDetails: Details
  cast: Cast[]
}

export const fetchSeach = async (
  search: string,
  page: number
): Promise<MoviesResult> => {
  const url = `//api.themoviedb.org/3/search/multi?&${API_KEY}&query=${search}&page=${page}`
  const searchResponse = await fetch(url)
  const searchList = await searchResponse.json()
  return searchList
}

export async function getMovies(
  pathname: keyof typeof getUrl,
  options: Options
): Promise<MoviesResult> {
  const url = getUrl[pathname](options)
  const moviesResponse = await axios.get(url)
  const { page, total_pages, results } = moviesResponse.data
  console.log(total_pages);
  return {
    moviesList: results,
    totalPages: total_pages,
    page,
  }
}

export async function fetchDetails(movieId: string): Promise<DetailsResult> {
  const detailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?&${API_KEY}&language=en-US`
  const castUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?&${API_KEY}&language=en-US`
  try {
    const detailsResponse = await axios.get(detailsUrl)
    const creditsResponse = await axios.get(castUrl)
    return {
      movieDetails: detailsResponse.data,
      cast: creditsResponse.data.cast,
    }
  } catch (err) {
    throw err.message
  }
}

export async function gethGenres(): Promise<GenresProps>{
  const url = `https://api.themoviedb.org/3/genre/movie/list?${API_KEY}&language=en-US`
  const {data} = await axios.get(url)
  return data
}

export const genresUrl = `https://api.themoviedb.org/3/genre/movie/list?${API_KEY}&language=en-US`