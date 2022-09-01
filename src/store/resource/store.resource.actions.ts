import { storeEnums } from "../store.enums";
import { APIResource } from "../../enums/api.enums";

import { IStoreAction } from "../store.interfaces";

export const setResourceData = (resourceName: APIResource, data: any): IStoreAction => {
    return {
        payload: { resourceName, data },
        type: storeEnums.SetResourceData,
    }
}

export const setResourceMessage = (resourceName: APIResource, message: string | null): IStoreAction => {
    return {
        payload: { resourceName, message },
        type: storeEnums.SetResourceMessage,
    }
}
