import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { ResourceFinder } from "./ResourceFinder";
import { ResourceIdentificator } from "./ResourceIdentificator";

import { APIResource } from "../enums/api.enums";

import { reqGetResource } from "../store/resource/store.resource.thunk.actions";

export function ResourceProvider(props: any) {
    const { id } = props;

    const { pathname } = useLocation();

    const resourceType = pathname.split("/")[1];

    const dispatch = useDispatch<any>();

    useEffect(() => {
        if (id !== undefined) {
            dispatch(reqGetResource(resourceType as APIResource, id));
        }
    }, [id]);

    return (
        <div className="grid-main">
            <ResourceFinder resourceType={resourceType} />
            <ResourceIdentificator resourceType={resourceType} />
            {props.children}
        </div>
    );
}