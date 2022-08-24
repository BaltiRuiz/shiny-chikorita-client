import { storeEnums } from "../store.enums";

import { IStoreAction } from "../store.interfaces";

export const setPokemonData = (data: any): IStoreAction => {
    return {
        payload: data,
        type: storeEnums.SetPokemonData,
    }
}

export const setPokemonMessage = (message: string | null): IStoreAction => {
    return {
        payload: message,
        type: storeEnums.SetPokemonMessage,
    }
}
