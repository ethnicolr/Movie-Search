const API_KEY = "api_key=33691dc9097a0a10121b027c1856edd7";
const API_HOSTNAME = "//api.themoviedb.org/3/";

export const getUrl = {
  "/search": options =>
    `${API_HOSTNAME}search/movie?&${API_KEY}&query=${options.search}&page=${options.page}`,
  "/top_rated": options =>
    `${API_HOSTNAME}movie/top_rated?&${API_KEY}&page=${options.page}`,
  "/upcoming": options =>
    `${API_HOSTNAME}movie/upcoming?&${API_KEY}&page=${options.page}`,
  "/popular": options =>
    `${API_HOSTNAME}movie/popular?&${API_KEY}&page=${options.page}`,
  "/": options =>
    `${API_HOSTNAME}movie/popular?&${API_KEY}&page=${options.page}`,
  "/movie": movieId =>
    `${API_HOSTNAME}movie/${movieId}?&${API_KEY}&language=en-US`,
  "/genres": () =>
    ` https://api.themoviedb.org/3/genre/movie/list?${API_KEY}&language=en-US`,
  "/filter": options =>
    `${API_HOSTNAME}discover/movie?&${API_KEY}&language=en-US&sort_by=${options.sortBy}&include_adult=false&include_video=false&page=${options.page}&with_genres=${options.genres}`,
    "/credits": movieId =>
    `https://api.themoviedb.org/3/movie/${movieId}/credits?&${API_KEY}&language=en-US`,
    "/similar": options =>
    `https://api.themoviedb.org/3/movie/${options.search}/similar?&${API_KEY}&language=en-USpage=${options.page}`,
};
