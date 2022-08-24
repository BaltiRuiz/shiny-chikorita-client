import axios from "axios";

const setRequestInterceptors = () => {
    axios.interceptors.request.use((config) => {
        return config;
    });
}

export const initAxiosConfiguration = () => {
    setRequestInterceptors();
}
