import axios from "axios";

import { APIResource } from "../enums/api.enums";

export const fetchResource = async (resourceName: APIResource, id: string): Promise<any> => {
    id = id.toLowerCase();

    const axiosURL = `http://localhost:3001/${resourceName}/${id}`;

    const axiosResult = await axios.get(
        axiosURL,
        { withCredentials: true },
    );

    return axiosResult.data;
}
