import axios from "axios";

const gateway = import.meta.env.VITE_BACKEND_API;

const axiosInstanceAuth = () => {
  const instance = axios.create({
    baseURL: gateway,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return instance;
};
export default axiosInstanceAuth;
