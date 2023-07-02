import axios from "axios";

const baseUrlLocal = axios.create({
  baseURL: "http://localhost:5000/",
});

export default baseUrlLocal;
