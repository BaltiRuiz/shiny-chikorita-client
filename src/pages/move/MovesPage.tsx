import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./MovesPage.css";

import { IStoreState } from "../../store/store.interfaces";

import {
    mapGenerationToExtendedVersion,
    mapPokemonTypeToColor,
    mapTargetToExtendedVersion,
} from "../../utils/mappings";

function MovesContentInfoPokemonType(props: any) {
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

function MovesContentInfoPokemon(props: any) {
    const { move, pokemons } = props;

    return (
        <div className="grid-main-content-moves-info-pokemon">
            {pokemons.map((pokemon: any) =>
                <React.Fragment key={`${move}-related-pokemon-${pokemon.id}`}>
                    <div className="grid-centered-element">
                        <img src={pokemon.sprite} style={{ maxWidth: "100%", maxHeight: "100%", imageRendering: "-webkit-optimize-contrast" }} alt="pokemon-sprite" />
                    </div>
                    <div className="grid-main-content-moves-info-pokemon-content">
                        <div className="grid-main-content-moves-info-pokemon-content-title">
                            <div className="grid-centered-element">
                                <h2>{pokemon.id}</h2>
                            </div>
                            <div className="grid-centered-element">
                                <Link to={`/pokemon/${pokemon.name}`} style={{ color: "black" }}>
                                    <h2>{pokemon.name.toUpperCase()}</h2>
                                </Link>
                            </div>
                        </div>
                        <div className="grid-main-content-moves-info-pokemon-content-types">
                            <MovesContentInfoPokemonType className="grid-centered-element grid-main-content-moves-info-pokemon-content-types-first" type={pokemon.firstType} />
                            <MovesContentInfoPokemonType className="grid-centered-element grid-main-content-moves-info-pokemon-content-types-second" type={pokemon.secondType} />
                        </div>
                    </div>
                </React.Fragment>
            )}
        </div>
    );
}

function MovesContentInfoMetadata(props: any) {
    const { generation, type, category, power, pp, accuracy, contestType, target, effectDescription, description } = props;

    const generationExtended = mapGenerationToExtendedVersion(generation);
    const targetExtended = mapTargetToExtendedVersion(target.name);

    return (
        <div className="grid-main-content-moves-info-metadata">
            <div className="grid-centered-element grid-main-content-moves-info-metadata-generation">
                <span>Introduced in <b>{generationExtended}</b></span>
            </div>
            <div className="grid-main-content-moves-info-metadata-type-category">
                <div className="grid-centered-element grid-main-content-moves-info-metadata-type">
                    <Link to={`/type/${type}`} style={{ color: mapPokemonTypeToColor(type) }}>
                        <h1>{type.toUpperCase()}</h1>
                    </Link>
                </div>
                <div className="grid-centered-element grid-main-content-moves-info-metadata-category">
                    <h1>{category.toUpperCase()}</h1>
                </div>
            </div>
            <div className="grid-main-content-moves-info-metadata-other">
                <div className="grid-centered-element grid-main-content-moves-info-metadata-other-power">
                    <h3>{`Power: ${power}`}</h3>
                </div>
                <div className="grid-centered-element grid-main-content-moves-info-metadata-other-pp">
                    <h3>{`PP: ${pp}`}</h3>
                </div>
                <div className="grid-centered-element grid-main-content-moves-info-metadata-other-accuracy">
                    <h3>{`Accuracy: ${accuracy}`}</h3>
                </div>
                <div className="grid-centered-element grid-main-content-moves-info-metadata-other-contest-type">
                    <h3>{`Contest Type: ${contestType.toUpperCase()}`}</h3>
                </div>
            </div>
            <div className="grid-main-content-moves-info-metadata-target">
                <div className="grid-centered-element grid-main-content-moves-info-metadata-target-title">
                    <h3>Target:</h3>
                </div>
                <div className="grid-centered-element grid-main-content-moves-info-metadata-target-name">
                    <h3>{targetExtended}</h3>
                </div>
                <div className="grid-centered-element grid-main-content-moves-info-metadata-target-description">
                    {target.description}
                </div>
            </div>
            <div className="grid-main-content-moves-info-metadata-effect">
                <div className="grid-centered-element grid-main-content-moves-info-metadata-effect-title">
                    <h3>Effect:</h3>
                </div>
                <div className="grid-centered-element grid-main-content-moves-info-metadata-effect-description">
                    {effectDescription}
                </div>
            </div>
            <div className="grid-centered-element grid-main-content-moves-info-metadata-description">
                {description}
            </div>
        </div>
    );
}

export function MovesPage(props: any) {
    const moveData = useSelector((state: IStoreState) => state.resource.move.data);
    const moveMessage = useSelector((state: IStoreState) => state.resource.move.message);

    if (moveData) {
        return (
            <div className="grid-main-content-moves-info">
                <MovesContentInfoMetadata
                    generation={moveData.generation}
                    type={moveData.type}
                    category={moveData.category}
                    power={moveData.power}
                    pp={moveData.pp}
                    accuracy={moveData.accuracy}
                    contestType={moveData.contestType}
                    target={moveData.target}
                    effectDescription={moveData.effectDescription}
                    description={moveData.description}
                />
                <MovesContentInfoPokemon move={moveData.name} pokemons={moveData.pokemons} />
            </div>
        );
    } else {
        return <p>{moveMessage}</p>
    }
}
