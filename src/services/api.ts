import { Alerts } from "@/utils/AlertsContainers";
import axios from "axios";
import Cookies from "js-cookie";
import router from "next/router";

const getApiInstance = () => {
  if (process.env.NODE_ENV === "development") {
    return axios.create({
      baseURL: "https://api-carros-w6mr.onrender.com/",
    });
  } else {
    return axios.create({
      baseURL: "https://api-carros-w6mr.onrender.com/",
    });
  }
};

export const api = getApiInstance();
export const apiI = getApiInstance();
export const getUserDataCookie = async () => {
  return new Promise<any>((resolve, reject) => {
    try {
      const token = Cookies.get("token");

      if (!token) {
        reject(new Error(`No token found in cookies`));
        return;
      }

      resolve({ token });
    } catch (error: any) {
      reject(new Error(`Error fetching data from cookies: ${error.message}`));
    }
  });
};

apiI.interceptors.request.use(async (config) => {
  const userData = await getUserDataCookie();
  const token = userData.token;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
