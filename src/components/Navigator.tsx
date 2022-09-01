import React from "react";
import { Navigate, useParams } from "react-router-dom";

export function Navigator(props: any) {
    const { to } = props;

    const params = useParams();
    const id = params.id ? params.id : "";

    return (
        <Navigate to={`${to}/${id}`} />
    );
}
