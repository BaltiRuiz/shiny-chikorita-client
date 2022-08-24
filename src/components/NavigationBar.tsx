import React from "react";

export function NavigationBar() {
    return (
        <div className="grid-nav">
            <div className="grid-centered-element grid-nav-pokemon">Pokédex</div>
            <div className="grid-centered-element grid-nav-types">Types</div>
            <div className="grid-centered-element grid-nav-moves">Moves</div>
            <div className="grid-centered-element grid-nav-ability">Abilities</div>
            <div className="grid-centered-element grid-nav-items">Items</div>
            <div className="grid-centered-element grid-nav-locations">Locations</div>
            <div className="grid-centered-element grid-nav-profile">Profile</div>
        </div>
    );
}
