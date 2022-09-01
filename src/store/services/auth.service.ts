import axios from "axios";

export class AuthService {
    static async loginUser(name: string, password: string): Promise<any> {
        return await axios.post(
            "http://localhost:5000/login",
            { name, password },
            { withCredentials: true },
        );
    }

    static async registerUser(name: string, password: string, passwordConfirmation: string): Promise<any> {
        return await axios.post(
            "http://localhost:5000/user",
            { name, password, passwordConfirmation },
            { withCredentials: true },
        );
    }

    static async logoutUser(): Promise<any> {
        return await axios.post(
            "http://localhost:5000/logout",
            {},
            { withCredentials: true },
        );
    }
}
