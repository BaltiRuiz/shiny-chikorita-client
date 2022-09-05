import { APPThunkAction, APPThunkDispatch } from "../store.interfaces";

import { setAPIState } from "../application/store.application.actions";

import { fetchResource } from "../../businesslogic/resource.business-logic";

import { setResourceData, setResourceMessage } from "./store.resource.actions";

import { APIState, APIResource } from "../../enums/api.enums";

export const reqGetResource = (resourceType: APIResource, id: string): APPThunkAction => async (dispatch: APPThunkDispatch) => {
    try {
        dispatch(setAPIState(APIState.Fetching));

        const resource = await fetchResource(resourceType, id);

        dispatch(setResourceData(resourceType, resource.data));
        dispatch(setResourceMessage(resourceType, resource.message));
    } catch (error) {
        dispatch(setResourceData(resourceType, null));
        dispatch(setResourceMessage(resourceType, error.response.data.message));
    } finally {
        dispatch(setAPIState(APIState.Fetched));
    }
}
