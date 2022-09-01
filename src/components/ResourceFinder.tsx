import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAPIStateFetching } from "../App";

export function ResourceFinder(props: any) {
    const { resourceName } = props;

    const [id, setID] = useState("");

    const navigate = useNavigate();

    const handleFindButtonClick = () => {
        navigate(`/${resourceName}/${id}`);
    }

    const isAPIFetching = useAPIStateFetching();

    return (
        <div className="grid-main-search">
            <div className="grid-centered-element grid-main-search-id">
                <input
                    type="text"
                    id="resource-id"
                    placeholder="Name or ID"
                    disabled={isAPIFetching}
                    onChange={(e) => setID(e.currentTarget.value)}
                />
            </div>
            <div className="grid-centered-element grid-main-search-button">
                <button
                    type="button"
                    disabled={isAPIFetching}
                    onClick={handleFindButtonClick}
                >
                    {`Find ${resourceName.toUpperCase()}`}
                </button>
            </div>
        </div>
    );
}