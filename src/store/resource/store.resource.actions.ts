import { storeEnums } from "../store.enums";
import { APIResource } from "../../enums/api.enums";

import { IStoreAction } from "../store.interfaces";

export const setResourceData = (resourceType: APIResource, data: any): IStoreAction => {
    return {
        payload: { resourceType, data },
        type: storeEnums.SetResourceData,
    }
}

export const setResourceMessage = (resourceType: APIResource, message: string | null): IStoreAction => {
    return {
        payload: { resourceType, message },
        type: storeEnums.SetResourceMessage,
    }
}
