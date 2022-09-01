import React, { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, useParams, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

import "./App.css";

import { initAxiosConfiguration } from "./config/axios.config";

import { APIState } from "./enums/api.enums";

import { IStoreState } from "./store/store.interfaces";
import { store } from "./store/store.service";

import { NavigationBar } from "./components/NavigationBar";
import { Footer } from "./components/Footer";
import { Navigator } from "./components/Navigator";

import { ResourceProvider } from "./pages/resource/ResourceProvider";
import { PokemonPage } from "./pages/pokemon/PokemonPage";
import { TypesPage } from "./pages/type/TypesPage";
import { MovesPage } from "./pages/MovesPage";
import { AbilitiesPage } from "./pages/ability/AbilitiesPage";
import { ItemsPage } from "./pages/ItemsPage";
import { LocationsPage } from "./pages/LocationsPage";
import { ProfilePage } from "./pages/ProfilePage";
import { LoginPage } from "./pages/login/LoginPage";
import { RegisterUserPage } from "./pages/register/RegisterUserPage";
import { LogoutPage } from "./pages/logout/LogoutPage";

import { reqGetUser } from "./store/user/store.user.thunk.actions";

export function useAPIStateFetching(): boolean {
    const applicationState = useSelector((state: IStoreState) => state.application);

    return applicationState.apiState === APIState.Fetching;
}

function PrivateRoute(props: any) {
    const checkTokenCookie = Cookies.get("check-token");

    const { id } = useParams();

    const userState = useSelector((state: IStoreState) => state.user);

    const dispatch = useDispatch<any>();

    const isAPIFetching = useAPIStateFetching();

    useEffect(() => {
        if (checkTokenCookie) {
            dispatch(reqGetUser());
        }
    }, [checkTokenCookie, dispatch]);

    const applicationOpacity = isAPIFetching ? 0.5 : 1;

    if (userState.name) {
        return (
            <div className="grid-container" style={{ opacity: applicationOpacity }}>
                <NavigationBar/>
                {React.cloneElement(props.children, { id })}
                <Footer/>
            </div>
        );
    } else {
        return (
            <Navigate to="/login" />
        );
    }
}

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Navigator to="/pokemon" />}/>
            <Route path="/:id" element={<Navigator to="/pokemon" />}/>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/register" element={<RegisterUserPage />}/>
            <Route path="/logout" element={<LogoutPage />}/>
            <Route path="/pokemon" element={<PrivateRoute><ResourceProvider><PokemonPage/></ResourceProvider></PrivateRoute>}/>
            <Route path="/pokemon/:id" element={<PrivateRoute><ResourceProvider><PokemonPage/></ResourceProvider></PrivateRoute>}/>
            <Route path="/type" element={<PrivateRoute><ResourceProvider><TypesPage/></ResourceProvider></PrivateRoute>}/>
            <Route path="/type/:id" element={<PrivateRoute><ResourceProvider><TypesPage/></ResourceProvider></PrivateRoute>}/>
            <Route path="/move" element={<PrivateRoute><ResourceProvider><MovesPage/></ResourceProvider></PrivateRoute>}/>
            <Route path="/move/:id" element={<PrivateRoute><ResourceProvider><MovesPage/></ResourceProvider></PrivateRoute>}/>
            <Route path="/ability" element={<PrivateRoute><ResourceProvider><AbilitiesPage/></ResourceProvider></PrivateRoute>}/>
            <Route path="/ability/:id" element={<PrivateRoute><ResourceProvider><AbilitiesPage/></ResourceProvider></PrivateRoute>}/>
            <Route path="/item" element={<PrivateRoute><ResourceProvider><ItemsPage/></ResourceProvider></PrivateRoute>}/>
            <Route path="/item/:id" element={<PrivateRoute><ResourceProvider><ItemsPage/></ResourceProvider></PrivateRoute>}/>
            <Route path="/location" element={<PrivateRoute><ResourceProvider><LocationsPage/></ResourceProvider></PrivateRoute>}/>
            <Route path="/location/:id" element={<PrivateRoute><ResourceProvider><LocationsPage/></ResourceProvider></PrivateRoute>}/>
            <Route path="/profile" element={<PrivateRoute><ProfilePage/></PrivateRoute>}/>
        </Routes>
    );
}

function App() {
    useEffect(() => {
        initAxiosConfiguration();
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <AppRouter/>
            </Router>
        </Provider>
    );
}

export default App;
