import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useAPIStateFetching } from "../App";

import { IStoreState } from "../store/store.interfaces";

export function ResourceIdentificator(props: any) {
    const { resourceType } = props;

    const navigate = useNavigate();

    const handlePreviousNextButtonClick = (newID: number) => {
        navigate(`/${resourceType}/${newID}`);
    }

    const resourceData = useSelector((state: IStoreState) => state.resource[resourceType].data);

    const isAPIFetching = useAPIStateFetching();

    if (resourceData) {
        const { id, name } = resourceData;

        return (
            <div className="grid-main-identificator">
                <div className="grid-centered-element grid-main-identificator-previous">
                    <button
                        type="button"
                        disabled={isAPIFetching}
                        onClick={() => handlePreviousNextButtonClick(+id - 1)}
                    >
                        Previous
                    </button>
                </div>
                <div className="grid-centered-element grid-main-identificator-id-name">
                    <h1>{`${id} - ${name.toUpperCase()}`}</h1>
                </div>
                <div className="grid-centered-element grid-main-identificator-next">
                    <button
                        type="button"
                        disabled={isAPIFetching}
                        onClick={() => handlePreviousNextButtonClick(+id + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>
        );
    } else {
        return null;
    }
}
