import { storeEnums } from "../store.enums";

import { IStoreAction } from "../store.interfaces";
import { IUserStoreState } from "./store.user.interfaces";

const initialState: IUserStoreState = {
    name: null,
    message: null,
};

export const userReducer = (state: IUserStoreState = initialState, action: IStoreAction): IUserStoreState => {
    switch (action.type) {
        case storeEnums.SetUserName:
            return {
                ...state,
                name: action.payload,
            };
        case storeEnums.SetUserMessage:
            return {
                ...state,
                message: action.payload,
            };
        default:
            return state;
    }
}
