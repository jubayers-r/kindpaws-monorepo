import axios from "axios";

export const AxiosSecure = axios.create({
  baseURL: "https://kind-paws.vercel.app/", // your backend base URL
  withCredentials: true, // needed to send cookies
});
