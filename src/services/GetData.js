import axios from "axios";

const BASE_URL = "https://swapi.dev/api";

const getPeople = async () => {
  const res = await axios.get(`${BASE_URL}/people`);
  return res.data;
};

const getMovies = async () => {
  const res = await axios.get(`${BASE_URL}/films`);
  return res.data;
};

export default {
  getPeople,
  getMovies,
};
