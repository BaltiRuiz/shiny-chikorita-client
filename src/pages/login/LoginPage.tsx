import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./LoginPage.css";

import { IStoreState } from "../../store/store.interfaces";

import { reqLoginUser } from "../../store/user/store.user.thunk.actions";

export function LoginPage() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const userState = useSelector((state: IStoreState) => state.user);

    const dispatch = useDispatch<any>();

    const navigate = useNavigate();

    const handleLoginClick = () => {
        dispatch(reqLoginUser(name, password));
    }

    const handleRegisterClick = () => {
        navigate("/register");
    }

    useEffect(() => {
        if (userState.name) {
            navigate("/");
        }
    }, [userState.name, navigate]);

    return (
        <div className="grid-login-container">
            <div className="grid-login-form">
                <form>
                    <div>
                        <label htmlFor="login-name">Name: </label>
                        <input
                            type="text"
                            id="login-name"
                            placeholder="Name"
                            autoComplete="username"
                            autoFocus={true}
                            onChange={(e) => setName(e.currentTarget.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="login-password">Password: </label>
                        <input
                            type="password"
                            id="login-password"
                            placeholder="Password"
                            autoComplete="current-password"
                            onChange={(e) => setPassword(e.currentTarget.value)}
                        />
                    </div>
                    <div>
                        <button
                            type="button"
                            onClick={handleLoginClick}
                        >
                            Login
                        </button>
                    </div>
                </form>
                <div>
                    <button
                        type="button"
                        onClick={handleRegisterClick}
                    >
                        Register User
                    </button>
                </div>
                <div>
                    <p>{userState.message}</p>
                </div>
            </div>
        </div>
    );
}
