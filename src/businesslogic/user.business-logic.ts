import axios from "axios";

export const fetchUser = async (): Promise<any> => {
    const axiosResult = await axios.get(
        "http://localhost:5000/user",
        { withCredentials: true },
    );

    return axiosResult.data;
}
