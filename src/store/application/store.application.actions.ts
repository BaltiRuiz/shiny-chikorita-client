import { APIState } from "../../enums/api.enums";

import { storeEnums } from "../store.enums";

import { IStoreAction } from "../store.interfaces";

export const setAPIState = (state: APIState): IStoreAction => {
    return {
        payload: state,
        type: storeEnums.SetAPIState,
    }
}
