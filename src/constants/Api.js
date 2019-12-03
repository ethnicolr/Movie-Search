const API_KEY = "api_key=33691dc9097a0a10121b027c1856edd7";
const API_HOSTNAME = "//api.themoviedb.org/3/";

export const getUrl = {
  "/search": options =>
    `${API_HOSTNAME}search/movie?&${API_KEY}&query=${options.search}&page=1`,
  "/top_rated": () =>
    `${API_HOSTNAME}movie/top_rated?&${API_KEY}&page=1`,
  "/upcoming": () =>
    `${API_HOSTNAME}movie/upcoming?&${API_KEY}&page=1`,
  "/popular": () =>
    `${API_HOSTNAME}movie/popular?&${API_KEY}&page=1`,
    "/": () => `${API_HOSTNAME}movie/popular?&${API_KEY}&page=1`,
};
