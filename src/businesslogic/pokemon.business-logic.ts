import axios from "axios";

export const fetchPokemon = async (id: string): Promise<any> => {
    id = id.toLowerCase();

    const axiosURL = `http://localhost:3001/pokemon/${id}`;

    const axiosResult = await axios.get(axiosURL);

    return axiosResult.data;
}
