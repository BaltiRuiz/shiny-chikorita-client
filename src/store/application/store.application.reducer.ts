import { APIState } from "../../enums/api.enums";

import { storeEnums } from "../store.enums";
import { IStoreAction } from "../store.interfaces";

import { IApplicationStoreState } from "./store.application.interfaces";

const initialState: IApplicationStoreState = {
    apiState: APIState.Idle
};

export const applicationReducer = (state: IApplicationStoreState = initialState, action: IStoreAction): IApplicationStoreState => {
    switch (action.type) {
        case storeEnums.SetAPIState:
            return {
                ...state,
                apiState: action.payload,
            };
        default:
            return state;
    }
}
