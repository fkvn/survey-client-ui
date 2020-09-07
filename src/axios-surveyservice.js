import axios from "axios";

const instance = axios.create({
  // baseURL: "http://ecst-csproj2.calstatela.edu:6328/api/"
  baseURL: "http://localhost:8080/api",
  // baseURL: "https://alice.cysun.org/surveys/api",
});

export default instance;
