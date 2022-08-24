import { storeEnums } from "../store.enums";

import { IStoreAction } from "../store.interfaces";

export const setUserName = (name: string | null): IStoreAction => {
    return {
        payload: name,
        type: storeEnums.SetUserName,
    }
}

export const setUserMessage = (message: string | null): IStoreAction => {
    return {
        payload: message,
        type: storeEnums.SetUserMessage,
    }
}
