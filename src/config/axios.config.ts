import axios from "axios";

import { AuthService } from "../store/services/auth.service";

const setRequestInterceptors = () => {
    axios.interceptors.request.use((config) => {
        return config;
    });
}

const setResponseInterceptors = () => {
    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response.status === 401) {
                AuthService.logoutUser();
            }

            return Promise.reject(error);
        }
    );
}

export const initAxiosConfiguration = () => {
    setRequestInterceptors();
    setResponseInterceptors();
}
