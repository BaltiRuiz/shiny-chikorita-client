import React from "react";

import { Link } from "react-router-dom";

export function NavigationBar() {
    return (
        <div className="grid-nav">
            <div className="grid-centered-element grid-nav-pokemon">
                <Link to="/pokemon">Pokédex</Link>
            </div>
            <div className="grid-centered-element grid-nav-types">
                <Link to="/type">Types</Link>
            </div>
            <div className="grid-centered-element grid-nav-moves">
                <Link to="/move">Moves</Link>
            </div>
            <div className="grid-centered-element grid-nav-ability">
                <Link to="/ability">Abilities</Link>
            </div>
            <div className="grid-centered-element grid-nav-items">
                <Link to="/item">Items</Link>
            </div>
            <div className="grid-centered-element grid-nav-locations">
                <Link to="/location">Locations</Link>
            </div>
            <div className="grid-centered-element grid-nav-profile">
                <Link to="/profile">Profile</Link>
            </div>
        </div>
    );
}
