import axios from "axios";

const newRequests = axios.create({
  baseURL: "http://127.0.0.1:8800/api/",
  withCredentials: true,
});

export default newRequests;
