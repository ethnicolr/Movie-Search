import axios from 'axios'
export const API_KEY = "api_key=33691dc9097a0a10121b027c1856edd7";
export const API_HOSTNAME = "//api.themoviedb.org/3/";

export interface Details {
  id: string;
  title: string;
  vote_average: number;
  poster_path: string | null;
  overview: string;
  tagline: string;
  release_date: string;
  first_air_date: string;
  genres: [{ name: string; id: string }];
  runtime: number;
  episode_run_time: number;
  name: string;
  production_countries: [{name: string}];
  media_type?: string
  budget: number
}

export interface MovieType {
  id: string;
  title: string;
  vote_average: number;
  poster_path: string | null;
  release_date: string;
  first_air_date: string;
  name: string;
  media_type: string;
}

interface OptionsUrl {
  search?: string;
  page?: string;
  sortBy?: string;
  genres?: string[];
}

export const fetchSeach = async (search: string, page: number) => {
  const url = `//api.themoviedb.org/3/search/multi?&${API_KEY}&query=${search}&page=${page}`;
  const searchResponse = await fetch(url);
  const searchList = await searchResponse.json();
  return searchList;
};

export interface Options {
  search?: string;
  page?: number;
  genres?: string[];
  sortBy?: string;
  movieId?: string;
}

interface UrlOptions {
  (options: Options): string
}

interface getUrlType {
  [key: string] : UrlOptions | string
}

export interface MoviesResult {
  page: number
  pageCount: number
  moviesList: MovieType[]
}

export const genresUrl = `https://api.themoviedb.org/3/genre/movie/list?${API_KEY}&language=en-US`

export const getUrl = {
  "/search": (options: Options): string =>
    `${API_HOSTNAME}search/multi?&${API_KEY}&query=${options.search}&page=${options.page}`,
  "/top_rated": (options: Options) =>
    `${API_HOSTNAME}movie/top_rated?&${API_KEY}&page=${options.page}`,
  "/upcoming": (options: Options) =>
    `${API_HOSTNAME}movie/upcoming?&${API_KEY}&page=${options.page}`,
  "/popular": (options: Options) =>
    `${API_HOSTNAME}movie/popular?&${API_KEY}&page=${options.page}`,
  "/": (options: Options) =>
    `${API_HOSTNAME}movie/popular?&${API_KEY}&page=${options.page}`,
  "/movie": (options: Options) =>
    `${API_HOSTNAME}movie/${options.movieId}?&${API_KEY}&language=en-US`,
  "/tv": (options: Options) =>
    `${API_HOSTNAME}tv/${options.movieId}?&${API_KEY}&language=en-US`,
    "/filter": (options: Options) =>
    `${API_HOSTNAME}discover/movie?&${API_KEY}&language=en-US&sort_by=${options.sortBy}&include_adult=false&include_video=false&page=${options.page}&with_genres=${options.genres}`,
    "/credits": (options: Options) =>
    `https://api.themoviedb.org/3/movie/${options.movieId}/credits?&${API_KEY}&language=en-US`,
    "/similar": (options: Options) =>
    `https://api.themoviedb.org/3/movie/${options.search}/similar?&${API_KEY}&language=en-USpage=1`,
    "/genres": `https://api.themoviedb.org/3/genre/movie/list?${API_KEY}&language=en-US`,
};


export type fetchMovieType = keyof typeof getUrl;

export type pathnameType = keyof typeof getUrl | 'favorite'

interface Cast {
  name: string
}

export interface DetailsResult {
  movieDetails: Details
  cast: Cast[]
}

export async function fetchDetails (movieId: string): Promise<DetailsResult>{
  const detailsUrl = `${API_HOSTNAME}movie/${movieId}?&${API_KEY}&language=en-US`
  const castUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?&${API_KEY}&language=en-US`
  try {
    const detailsResponse = await axios.get(detailsUrl)
    const creditsResponse = await axios.get(castUrl);
    return {
      movieDetails: detailsResponse.data,
      cast: creditsResponse.data.cast
    }
  } catch (err) {
    console.log(err);
    throw err.message
  }
}

export async function getMovies(pathname: keyof typeof getUrl, options: Options ): Promise<MoviesResult> {
  let url = pathname !== '/genres' ? getUrl[pathname](options) : getUrl[pathname];
  try {
    let moviesResponse = await axios.get(url);
    const {page, total_pages, results} = moviesResponse.data;
    return {
      pageCount: total_pages,
      moviesList: results,
      page
    };
  } catch (err){
    throw err
  }
}
