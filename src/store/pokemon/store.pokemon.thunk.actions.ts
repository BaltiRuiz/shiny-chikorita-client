import { APPThunkAction, APPThunkDispatch } from "../store.interfaces";

import { APIState } from "../../enums/api.enums";

import { setAPIState } from "../application/store.application.actions";

import { fetchPokemon } from "../../businesslogic/pokemon.business-logic";

import { setPokemonData, setPokemonMessage } from "./store.pokemon.actions";

export const reqGetPokemon = (name: string): APPThunkAction => async (dispatch: APPThunkDispatch) => {
    try {
        dispatch(setAPIState(APIState.Fetching));

        const pokemon = await fetchPokemon(name);

        dispatch(setPokemonData(pokemon.data));
        dispatch(setPokemonMessage(pokemon.message));
    } catch (error) {
        dispatch(setPokemonData(null));
        dispatch(setPokemonMessage(error.response.data.message));
    } finally {
        dispatch(setAPIState(APIState.Fetched));
    }
}
