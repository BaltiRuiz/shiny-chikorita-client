import jwtDecode from "jwt-decode";

import { StorageKey } from "../../enums/storage.enums";

import { APPThunkAction, APPThunkDispatch } from "../store.interfaces";

import { setUserMessage, setUserName } from "./store.user.actions";

import { AuthService } from "../services/auth.service";

export const reqGetUser = (token: string): APPThunkAction => async (dispatch: APPThunkDispatch) => {
    try {
        const decodedToken: any = jwtDecode(token);

        dispatch(setUserName(decodedToken.name));
    } catch (error) {
        console.log(`There was an error while retrieving user information: ${error}`);
    }
}

export const reqLoginUser = (name: string, password: string): APPThunkAction => async (dispatch: APPThunkDispatch) => {
    try {
        const userToken = await AuthService.loginUser(name, password);
        const decodedToken: any = jwtDecode(userToken);

        localStorage.setItem(StorageKey.UserToken, userToken);

        dispatch(setUserName(decodedToken.name));
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
        const userToken = await AuthService.registerUser(name, password, passwordConfirmation);
        const decodedToken: any = jwtDecode(userToken);

        localStorage.setItem(StorageKey.UserToken, userToken);

        dispatch(setUserName(decodedToken.name));
        dispatch(setUserMessage(null));
    } catch (error) {
        dispatch(setUserMessage(error.response.data));
    }
}

export const reqLogoutUser = (): void => {
    AuthService.logoutUser();
}
