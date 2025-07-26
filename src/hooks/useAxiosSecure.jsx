import { useEffect } from "react";
import { useNavigate } from "react-router";
import { AxiosSecure } from "@/lib/axiosSecure";

export const useAxiosSecure = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = AxiosSecure.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response?.status === 401 || err.response?.status === 403) {
          console.warn("Unauthorized or Forbidden, redirecting to login...");
          navigate("/login");
        }
        return Promise.reject(err);
      }
    );

    return () => {
      AxiosSecure.interceptors.response.eject(interceptor);
    };
  }, [navigate]);

  return AxiosSecure;
};
