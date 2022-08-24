import { storeEnums } from "../store.enums";

import { IStoreAction } from "../store.interfaces";
import { IPokemonStoreState } from "./store.pokemon.interfaces";

const initialState: IPokemonStoreState = {
    data: null,
    message: null,
};

export const pokemonReducer = (state: IPokemonStoreState = initialState, action: IStoreAction): IPokemonStoreState => {
    switch (action.type) {
        case storeEnums.SetPokemonData:
            return {
                ...state,
                data: action.payload,
            };
        case storeEnums.SetPokemonMessage:
            return {
                ...state,
                message: action.payload,
            };
        default:
            return state;
    }
}
