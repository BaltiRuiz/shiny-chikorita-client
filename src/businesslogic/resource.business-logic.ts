import axios from "axios";

import { APIResource } from "../enums/api.enums";

export const fetchResource = async (resourceType: APIResource, id: string): Promise<any> => {
    id = id.toLowerCase();

    const axiosURL = `http://localhost:3001/${resourceType}/${id}`;

    const axiosResult = await axios.get(
        axiosURL,
        { withCredentials: true },
    );

    return axiosResult.data;
}
