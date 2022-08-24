import axios from "axios";

import { store } from "../store.service";

import { setUserMessage, setUserName } from "../user/store.user.actions";

export class AuthService {
    static async loginUser(name: string, password: string): Promise<any> {
        const axiosResult = await axios.post(
            "http://localhost:3000/login",
            { name, password },
        );

        return axiosResult.data;
    }

    static async registerUser(name: string, password: string, passwordConfirmation: string): Promise<any> {
        const axiosResult = await axios.post(
            "http://localhost:3000/user",
            { name, password, passwordConfirmation },
        );

        return axiosResult.data;
    }

    static logoutUser(): void {
        try {
            localStorage.clear();

            store.dispatch(setUserName(null));
            store.dispatch(setUserMessage(null));
        } catch (error) {
            store.dispatch(setUserMessage(error.response.data));
        }
    }
}
