import React from "react";

export function Footer() {
    return (
        <div className="grid-centered-element grid-footer">{`Based on PokéAPI | ${new Date().getFullYear()}`}</div>
    );
}
