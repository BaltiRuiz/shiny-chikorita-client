import { APPThunkAction, APPThunkDispatch } from "../store.interfaces";

import { setUserMessage, setUserName } from "./store.user.actions";

import { AuthService } from "../services/auth.service";

import { fetchUser } from "../../businesslogic/user.business-logic";

export const reqGetUser = (): APPThunkAction => async (dispatch: APPThunkDispatch) => {
    try {
        const user = await fetchUser();

        dispatch(setUserName(user.name));
    } catch (error) {
        dispatch(setUserMessage(error.response.data));
    }
}

export const reqLoginUser = (name: string, password: string): APPThunkAction => async (dispatch: APPThunkDispatch) => {
    try {
        await AuthService.loginUser(name, password);

        dispatch(setUserName(name));
        dispatch(setUserMessage(null));
    } catch (error) {
        dispatch(setUserMessage(error.response.data));
    }
};

export const reqRegisterUser = (
    name: string,
    password: string,
    passwordConfirmation: string,
): APPThunkAction => async (dispatch: APPThunkDispatch) => {
    try {
        await AuthService.registerUser(name, password, passwordConfirmation);

        dispatch(setUserName(name));
        dispatch(setUserMessage(null));
    } catch (error) {
        dispatch(setUserMessage(error.response.data));
    }
}

export const reqLogoutUser = (): APPThunkAction => async (dispatch: APPThunkDispatch) => {
    try {
        await AuthService.logoutUser();

        dispatch(setUserName(null));
        dispatch(setUserMessage(null));
    } catch (error) {
        dispatch(setUserMessage(error.response.data));
    }
}
