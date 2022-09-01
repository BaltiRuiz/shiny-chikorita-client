import { APPThunkAction, APPThunkDispatch } from "../store.interfaces";

import { setAPIState } from "../application/store.application.actions";

import { fetchResource } from "../../businesslogic/resource.business-logic";

import { setResourceData, setResourceMessage } from "./store.resource.actions";

import { APIState, APIResource } from "../../enums/api.enums";

export const reqGetResource = (resourceName: APIResource, id: string): APPThunkAction => async (dispatch: APPThunkDispatch) => {
    try {
        dispatch(setAPIState(APIState.Fetching));

        const resource = await fetchResource(resourceName, id);

        dispatch(setResourceData(resourceName, resource.data));
        dispatch(setResourceMessage(resourceName, resource.message));
    } catch (error) {
        dispatch(setResourceData(resourceName, null));
        dispatch(setResourceMessage(resourceName, error.response.data.message));
    } finally {
        dispatch(setAPIState(APIState.Fetched));
    }
}
