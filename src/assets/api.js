import axios from "axios";

const api = axios.create({
  //   baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000",
  baseURL: "http://localhost:5000",

  withCredentials: true, // trimite cookie-urile automat
});

export default api;
