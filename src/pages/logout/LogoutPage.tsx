import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { IStoreState } from "../../store/store.interfaces";

import { reqLogoutUser } from "../../store/user/store.user.thunk.actions";

export function LogoutPage() {
    const userState = useSelector((state: IStoreState) => state.user);

    const dispatch = useDispatch<any>();

    const navigate = useNavigate();

    useEffect(() => {
        if (userState.name) {
            dispatch(reqLogoutUser());
        } else {
            navigate("/");
        }
    });

    return (
        <div className="screen-centered-block-outer">
            <div className="screen-centered-block-inner">
                {userState.message ? userState.message : "Redirecting to login page..."}
            </div>
        </div>
    );
}
