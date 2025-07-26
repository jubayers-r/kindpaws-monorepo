import axios from "axios";

export const AxiosSecure = axios.create({
  baseURL: "http://localhost:8000", // your backend base URL
  withCredentials: true, // needed to send cookies
});
