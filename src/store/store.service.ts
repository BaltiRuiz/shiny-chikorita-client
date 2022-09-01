import thunk from "redux-thunk";
import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";

import { applicationReducer } from "./application/store.application.reducer";
import { resourceReducer } from "./resource/store.resource.reducer";
import { userReducer } from "./user/store.user.reducer";

const storeReducers = combineReducers(
    {
        application: applicationReducer,
        resource: resourceReducer,
        user: userReducer,
    }
);

export const store = createStore(
    storeReducers,
    composeWithDevTools(
        applyMiddleware(thunk),
    ),
);
