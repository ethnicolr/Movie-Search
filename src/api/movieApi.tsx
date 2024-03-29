import axios from 'axios'
import { request } from 'http'
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
  pathname: keyof typeof getUrl | '/favorite'
  search?: string
  page?: number
  genres?: string[]
  sortBy?: string
  movieId?: string
  mediaType?: string
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
    `https://api.themoviedb.org/3/${options.mediaType}/${options.movieId}/similar?&${API_KEY}&language=en-USpage=1`,
  '/favorite': (options: Options): string =>
    `https://api.themoviedb.org/3/movie/${options.movieId}?&${API_KEY}&language=en-US`,
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

export type Status = 'indle' | 'fetching' | 'fetched' | 'error'

export const fetchSeach = async (
  search: string,
  page: number
): Promise<MoviesResult> => {
  const url = `//api.themoviedb.org/3/search/multi?&${API_KEY}&query=${search}&page=${page}`
  const searchResponse = await fetch(url)
  const searchList = await searchResponse.json()
  return searchList
}

export async function getMovies(options: Options): Promise<MoviesResult> {
  const path = options.pathname

  const url = getUrl[path](options)
  const moviesResponse = await axios.get(url)
  const { page, total_pages, results } = moviesResponse.data
  return {
    moviesList: results,
    totalPages: total_pages,
    page,
  }
}

export async function getDetails(
  movieId: string,
  mediaType = 'movie'
): Promise<DetailsResult> {
  const detailsUrl = `https://api.themoviedb.org/3/${mediaType}/${movieId}?&${API_KEY}&language=en-US`
  console.log(detailsUrl)
  const castUrl = `https://api.themoviedb.org/3/${mediaType}/${movieId}/credits?&${API_KEY}&language=en-US`
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

export async function getFavorite(list: string[]): Promise<MovieType[]> {
  try {
    const favoriteList = await Promise.all(
      list.map(async (id) => {
        const url = getUrl['/favorite']({ movieId: id, pathname: '/favorite' })
        const response = await axios.get(url)
        return response.data
      })
    )
    return favoriteList
  } catch (err) {
    throw err.message
  }
}

export async function gethGenres(): Promise<GenresProps> {
  const url = `https://api.themoviedb.org/3/genre/movie/list?${API_KEY}&language=en-US`
  const { data } = await axios.get(url)
  return data
}

export const genresUrl = `https://api.themoviedb.org/3/genre/movie/list?${API_KEY}&language=en-US`
