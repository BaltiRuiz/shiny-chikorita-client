import thunk from "redux-thunk";
import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";

import { applicationReducer } from "./application/store.application.reducer";
import { pokemonReducer } from "./pokemon/store.pokemon.reducer";
import { userReducer } from "./user/store.user.reducer";

const storeReducers = combineReducers(
    {
        application: applicationReducer,
        pokemon: pokemonReducer,
        user: userReducer,
    }
);

export const store = createStore(
    storeReducers,
    composeWithDevTools(
        applyMiddleware(thunk),
    ),
);
