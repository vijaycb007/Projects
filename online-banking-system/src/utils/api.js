import axios from "axios";

let api = axios.create({
  baseURL: "http://localhost:3000",
});
export default api;
