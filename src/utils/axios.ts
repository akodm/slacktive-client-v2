import axios, { Axios, HeadersDefaults } from "axios";
import { API_URL } from "./consts";

const axiosOptions = {
  baseURL: API_URL,
  timeout: 10000,
  withCredentials: true
};

const defaultAxios: Axios = axios.create(axiosOptions);
const apiAxios: Axios = axios.create(axiosOptions);

interface AxiosHeaders extends HeadersDefaults {
  Authorization: string;
}

export const setAuth = (auth: string) => {
  apiAxios.defaults.headers = {
    ...apiAxios.defaults.headers,
    Authorization: `Bearer ${auth}`,
  } as AxiosHeaders;
};

export default axios;
export { defaultAxios, apiAxios };