import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { IApplicationStoreState } from "./application/store.application.interfaces";
import { IPokemonStoreState } from "./pokemon/store.pokemon.interfaces";
import { IUserStoreState } from "./user/store.user.interfaces";

export interface IStoreState {
    application: IApplicationStoreState,
    pokemon: IPokemonStoreState,
    user: IUserStoreState,
}

export interface IStoreAction {
    type: string;
    payload: any;
}

export type APPThunkAction<T = Promise<void>> = ThunkAction<T, IStoreState, undefined, IStoreAction>;

export type APPThunkDispatch = ThunkDispatch<IStoreState, undefined, IStoreAction>;
export type APPThunkGetState = () => IStoreState;
