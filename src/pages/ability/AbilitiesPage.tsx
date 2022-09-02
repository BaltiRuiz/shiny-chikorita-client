import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./AbilitiesPage.css";

import { IStoreState } from "../../store/store.interfaces";

import { mapGenerationToExtendedVersion, mapPokemonTypeToColor } from "../../utils/mappings";

function AbilitiesContentInfoMetadata(props: any) {
    const { generation, shortDescription, description } = props;

    const generationExtended = mapGenerationToExtendedVersion(generation);

    return (
        <div className="grid-main-content-abilities-info-metadata">
            <div className="grid-centered-element grid-main-content-abilities-info-metadata-generation">
                <span>Introduced in <b>{generationExtended}</b></span>
            </div>
            <div className="grid-main-content-abilities-info-metadata-short-description">
                <div className="grid-centered-element grid-main-content-abilities-info-metadata-short-description-title">
                    <h2>Short description:</h2>
                </div>
                <div className="grid-centered-element grid-main-content-abilities-info-metadata-short-description-content">
                    {shortDescription}
                </div>
            </div>
            <div className="grid-main-content-abilities-info-metadata-description">
                <div className="grid-centered-element grid-main-content-abilities-info-metadata-description-title">
                    <h2>Description:</h2>
                </div>
                <div className="grid-centered-element grid-main-content-abilities-info-metadata-description-content">
                    {description}
                </div>
            </div>
        </div>
    );
}

function AbilitiesContentInfoPokemonType(props: any) {
    const { className, type } = props;

    if (type) {
        return (
            <div className={className}>
                <Link to={`/type/${type}`} style={{ color: mapPokemonTypeToColor(type) }}>
                    <h2>{type.toUpperCase()}</h2>
                </Link>
            </div>
        );
    } else {
        return null;
    }
}

function AbilitiesContentInfoPokemonAbility(props: any) {
    const { nameClassName, ability } = props;

    if (ability) {
        return (
            <div className={nameClassName}>
                <Link to={`/ability/${ability}`} style={{ color: "black" }}>
                    <b>{ability.toUpperCase()}</b>
                </Link>
            </div>
        );
    } else {
        return null;
    }
}

function AbilitiesContentInfoPokemon(props: any) {
    const { ability, pokemons } = props;

    return (
        <div className="grid-main-content-abilities-info-pokemon">
            {pokemons.map((pokemon: any) =>
                <React.Fragment key={`${ability}-related-pokemon-${pokemon.id}`}>
                    <div className="grid-centered-element">
                        <img src={pokemon.sprite} style={{ maxWidth: "100%", maxHeight: "100%", imageRendering: "-webkit-optimize-contrast" }} alt="pokemon-sprite" />
                    </div>
                    <div className="grid-main-content-abilities-info-pokemon-content">
                        <div className="grid-main-content-abilities-info-pokemon-content-title">
                            <div className="grid-centered-element">
                                <h2>{pokemon.id}</h2>
                            </div>
                            <div className="grid-centered-element">
                                <Link to={`/pokemon/${pokemon.name}`} style={{ color: "black" }}>
                                    <h2>{pokemon.name.toUpperCase()}</h2>
                                </Link>
                            </div>
                        </div>
                        <div className="grid-main-content-abilities-info-pokemon-content-types">
                            <AbilitiesContentInfoPokemonType className="grid-centered-element grid-main-content-abilities-info-pokemon-content-types-first" type={pokemon.firstType} />
                            <AbilitiesContentInfoPokemonType className="grid-centered-element grid-main-content-abilities-info-pokemon-content-types-second" type={pokemon.secondType} />
                        </div>
                        <div className="grid-main-content-abilities-info-pokemon-content-abilities">
                            <AbilitiesContentInfoPokemonAbility
                                nameClassName="grid-centered-element"
                                ability={pokemon.firstAbility}
                            />
                            <AbilitiesContentInfoPokemonAbility
                                nameClassName="grid-centered-element"
                                ability={pokemon.secondAbility}
                            />
                            <AbilitiesContentInfoPokemonAbility
                                nameClassName="grid-centered-element"
                                ability={pokemon.thirdAbility}
                            />
                        </div>
                    </div>
                </React.Fragment>
            )}
        </div>
    );
}

export function AbilitiesPage(props: any) {
    const abilityData = useSelector((state: IStoreState) => state.resource.ability.data);
    const abilityMessage = useSelector((state: IStoreState) => state.resource.ability.message);

    if (abilityData) {
        return (
            <div className="grid-main-content-abilities-info">
                <AbilitiesContentInfoMetadata generation={abilityData.generation} shortDescription={abilityData.shortDescription} description={abilityData.description} />
                <AbilitiesContentInfoPokemon ability={abilityData.name} pokemons={abilityData.pokemons} />
            </div>
        );
    } else {
        return <p>{abilityMessage}</p>
    }
}
