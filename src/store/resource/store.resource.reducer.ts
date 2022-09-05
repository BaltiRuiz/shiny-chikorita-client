import { storeEnums } from "../store.enums";

import { IStoreAction } from "../store.interfaces";

import { IResourceStoreState } from "./store.resource.interfaces";

const initialState: IResourceStoreState = {
    pokemon: {
        data: null,
        message: null,
    },
    type: {
        data: null,
        message: null,
    },
    move: {
        data: null,
        message: null,
    },
    ability: {
        data: null,
        message: null,
    },
    item: {
        data: null,
        message: null,
    },
    location: {
        data: null,
        message: null,
    },
};

export const resourceReducer = (state: any = initialState, action: IStoreAction): any => {
    const newState = { ...state };

    const actionPayload = action.payload;

    switch (action.type) {
        case storeEnums.SetResourceData:
            newState[actionPayload.resourceType].data = actionPayload.data;
        case storeEnums.SetResourceMessage:
            newState[actionPayload.resourceType].message = actionPayload.message;
        default:
            return newState;
    }
}
