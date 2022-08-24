import React, { useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";

import "./App.css";

import { initAxiosConfiguration } from "./config/axios.config";

import { APIState } from "./enums/api.enums";

import { IStoreState } from "./store/store.interfaces";
import { store } from "./store/store.service";

import { NavigationBar } from "./components/NavigationBar";
import { Footer } from "./components/Footer";

import { PokemonPage } from "./pages/PokemonPage";

export function useAPIStateFetching(): boolean {
    const applicationState = useSelector((state: IStoreState) => state.application);

    return applicationState.apiState === APIState.Fetching;
}

function PrivateRoute(props: any) {
    const { id } = useParams();

    const isAPIFetching = useAPIStateFetching();

    const applicationOpacity = isAPIFetching ? 0.5 : 1;

    return (
        <div className="grid-container" style={{ opacity: applicationOpacity }}>
            <NavigationBar/>
            {React.cloneElement(props.children, { id })}
            <Footer/>
        </div>
    );
}

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<PrivateRoute><PokemonPage/></PrivateRoute>}/>
            <Route path="/:id" element={<PrivateRoute><PokemonPage/></PrivateRoute>}/>
            <Route path="/pokemon" element={<PrivateRoute><PokemonPage/></PrivateRoute>}/>
            <Route path="/pokemon/:id" element={<PrivateRoute><PokemonPage/></PrivateRoute>}/>
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
