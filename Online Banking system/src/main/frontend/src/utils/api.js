import axios from "axios";

//* HTTP client wrapper (or) API client : used to shorten the axios URL
let api = axios.create({
  baseURL: "http://localhost:8080",
});
export default api;
