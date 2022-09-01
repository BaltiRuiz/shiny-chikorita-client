import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./RegisterUserPage.css";

import { IStoreState } from "../../store/store.interfaces";

import { setUserMessage } from "../../store/user/store.user.actions";
import { reqRegisterUser } from "../../store/user/store.user.thunk.actions";

export function RegisterUserPage() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const userState = useSelector((state: IStoreState) => state.user);

    const dispatch = useDispatch<any>();

    const navigate = useNavigate();

    const handleConfirmClick = () => {
        dispatch(reqRegisterUser(name, password, passwordConfirmation));
    }

    const handleBackClick = () => {
        navigate("/login");
    }

    useEffect(() => {
        dispatch(setUserMessage(null));
    }, [dispatch]);

    useEffect(() => {
        if (userState.name) {
            navigate("/");
        }
    }, [userState.name, navigate]);

    return (
        <div className="grid-register-container">
            <div className="grid-register-form">
                <form>
                    <div>
                        <label htmlFor="register-name">Name: </label>
                        <input
                            type="text"
                            id="register-name"
                            placeholder="Name"
                            autoComplete="username"
                            autoFocus={true}
                            onChange={(e) => setName(e.currentTarget.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="register-password">Password: </label>
                        <input
                            type="password"
                            id="register-password"
                            placeholder="Password"
                            autoComplete="current-password"
                            onChange={(e) => setPassword(e.currentTarget.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="register-password-confirmation">Password confirmation: </label>
                        <input
                            type="password"
                            id="register-password-confirmation"
                            placeholder="Password Confirmation"
                            autoComplete="current-password"
                            onChange={(e) => setPasswordConfirmation(e.currentTarget.value)}
                        />
                    </div>
                    <div>
                        <button
                            type="button"
                            onClick={handleConfirmClick}
                        >
                            Confirm
                        </button>
                    </div>
                </form>
                <div>
                    <button
                        type="button"
                        onClick={handleBackClick}
                    >
                        Back
                    </button>
                </div>
                <div>
                    <p>{userState.message}</p>
                </div>
            </div>
        </div>
    );
}
