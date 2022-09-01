import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import "./PokemonPage.css";

import { useAPIStateFetching } from "../../App";

import { IStoreState } from "../../store/store.interfaces";

import { PokemonGeneration, PokemonGenerationExtended } from "../../enums/pokemon.enums";

import { mapPokemonTypeToColor } from "../../utils/mappings";

function PokemonContentPhotosBar(props: any) {
    const { sprites, generation, genre, onGenerationSelection, onGenreButtonClick } = props;

    const isAPIFetching = useAPIStateFetching();

    const disableFemaleButton = Object.values(sprites[generation].female).every((femaleSprite: any) => femaleSprite === null);

    return (
        <div className="grid-main-content-pokemon-photo-bar">
            <div className="grid-centered-element grid-main-content-pokemon-photo-bar-generations">
                <select
                    id="sprites-generation"
                    value={generation}
                    disabled={isAPIFetching}
                    onChange={onGenerationSelection}
                >
                    <option key="sprites-default" value="default">Default</option>
                    {Object.keys(PokemonGeneration).map((generationKey: string) => {
                        const generationValue = PokemonGeneration[generationKey];

                        const disableOption = Object.values(sprites[generationValue].default).every((defaultSprite: any) => defaultSprite === null);

                        return (
                            <option
                                key={`sprites-${generationValue}`}
                                value={generationValue}
                                disabled={disableOption}
                            >
                                {PokemonGenerationExtended[generationKey]}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div className="grid-centered-element grid-main-content-pokemon-photo-bar-genres">
                <form>
                    <input
                        type="radio"
                        id="sprites-default"
                        name="sprites-genre"
                        value="default"
                        checked={genre === "default"}
                        disabled={isAPIFetching}
                        onChange={onGenreButtonClick}
                    />
                    <label htmlFor="sprites-default">Default</label>
                    &nbsp;
                    <input
                        type="radio"
                        id="sprites-female"
                        name="sprites-genre"
                        value="female"
                        checked={genre === "female"}
                        disabled={disableFemaleButton || isAPIFetching}
                        onChange={onGenreButtonClick}
                    />
                    <label htmlFor="sprites-female">Female</label>
                </form>
            </div>
        </div>
    );
}

function PokemonContentPhotos(props: any) {
    const { sprites } = props;

    const [generation, setGeneration] = useState("default");
    const [genre, setGenre] = useState("default");

    const handleGenerationSelection = (e: any) => {
        setGeneration(e.currentTarget.value);
    }

    const handleGenreButtonClick = (e: any) => {
        setGenre(e.currentTarget.value);
    }

    useEffect(() => {
        setGeneration("default");
        setGenre("default");
    }, [sprites]);

    return (
        <div className="grid-main-content-pokemon-photo">
            <PokemonContentPhotosBar sprites={sprites} generation={generation} genre={genre} onGenerationSelection={handleGenerationSelection} onGenreButtonClick={handleGenreButtonClick} />
            <div className="grid-main-content-pokemon-photo-sprites">
                <div className="grid-centered-element grid-main-content-pokemon-photo-sprites-normal-back">
                    <img src={sprites[generation][genre].backDefault} alt="pokemon-sprite" />
                </div>
                <div className="grid-centered-element grid-main-content-pokemon-photo-sprites-normal-front">
                    <img src={sprites[generation][genre].frontDefault} alt="pokemon-sprite" />
                </div>
                <div className="grid-centered-element grid-main-content-pokemon-photo-sprites-shiny-back">
                    <img src={sprites[generation][genre].backShiny} alt="pokemon-sprite" />
                </div>
                <div className="grid-centered-element grid-main-content-pokemon-photo-sprites-shiny-front">
                    <img src={sprites[generation][genre].frontShiny} alt="pokemon-sprite" />
                </div>
            </div>
        </div>
    );
}

function PokemonContentInfoBasicType(props: any) {
    const { className, type } = props;

    if (type) {
        return (
            <div className={className}>
                <Link to={`/type/${type}`} style={{ color: mapPokemonTypeToColor(type) }}>
                    <h1>{type.toUpperCase()}</h1>
                </Link>
            </div>
        );
    } else {
        return null;
    }
}

function PokemonContentInfoBasic(props: any) {
    const { id, name, firstType, secondType } = props;

    const navigate = useNavigate();

    const handlePreviousNextButtonClick = (newID: number) => {
        navigate(`/pokemon/${newID}`);
    }

    const isAPIFetching = useAPIStateFetching();

    return (
        <div className="grid-main-content-pokemon-info-basic">
            <div className="grid-centered-element grid-main-content-pokemon-info-basic-previous">
                <button
                    type="button"
                    disabled={isAPIFetching}
                    onClick={() => handlePreviousNextButtonClick(+id - 1)}
                >
                    Previous
                </button>
            </div>
            <div className="grid-centered-element grid-main-content-pokemon-info-basic-id"><h1>{id}</h1></div>
            <div className="grid-centered-element grid-main-content-pokemon-info-basic-name"><h1>{name.toUpperCase()}</h1></div>
            <PokemonContentInfoBasicType className="grid-centered-element grid-main-content-pokemon-info-basic-first-type" type={firstType} />
            <PokemonContentInfoBasicType className="grid-centered-element grid-main-content-pokemon-info-basic-second-type" type={secondType} />
            <div className="grid-centered-element grid-main-content-pokemon-info-basic-next">
                <button
                    type="button"
                    disabled={isAPIFetching}
                    onClick={() => handlePreviousNextButtonClick(+id + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

function PokemonContentInfoMetadata(props: any) {
    const { height, weight, species } = props;

    return (
        <div className="grid-main-content-pokemon-info-metadata">
            <div className="grid-centered-element grid-main-content-pokemon-info-metadata-height"><h3>{`Height: ${height} m`}</h3></div>
            <div className="grid-centered-element grid-main-content-pokemon-info-metadata-weight"><h3>{`Weight: ${weight} kg`}</h3></div>
            <div className="grid-centered-element grid-main-content-pokemon-info-metadata-species"><h3>{`Species: ${species}`}</h3></div>
        </div>
    );
}

function PokemonContentInfoAbility(props: any) {
    const { nameClassName, descriptionClassName, ability } = props;

    if (ability) {
        return (
            <>
                <div className={nameClassName}>
                    <Link to={`/ability/${ability.name}`} style={{ color: "black" }}>
                        <b>{ability.hidden ? "(Hidden) " : ""}{ability.name.toUpperCase()}</b>
                    </Link>
                </div>
                <div className={descriptionClassName}>{ability.description}</div>
            </>
        );
    } else {
        return null;
    }
}

function PokemonContentInfoAbilities(props: any) {
    const { firstAbility, secondAbility, thirdAbility } = props;

    return (
        <div className="grid-main-content-pokemon-info-abilities">
            <div className="grid-centered-element grid-main-content-pokemon-info-abilities-title"><h2>Abilities:</h2></div>
            <div className="grid-main-content-pokemon-info-abilities-details">
                <PokemonContentInfoAbility
                    nameClassName="grid-centered-element grid-main-content-pokemon-info-abilities-details-first-name"
                    descriptionClassName="grid-centered-element grid-main-content-pokemon-info-abilities-details-first-description"
                    ability={firstAbility}
                />
                <PokemonContentInfoAbility
                    nameClassName="grid-centered-element grid-main-content-pokemon-info-abilities-details-second-name"
                    descriptionClassName="grid-centered-element grid-main-content-pokemon-info-abilities-details-second-description"
                    ability={secondAbility}
                />
                <PokemonContentInfoAbility
                    nameClassName="grid-centered-element grid-main-content-pokemon-info-abilities-details-third-name"
                    descriptionClassName="grid-centered-element grid-main-content-pokemon-info-abilities-details-third-description"
                    ability={thirdAbility}
                />
            </div>
        </div>
    );
}

function PokemonContentInfoStats(props: any) {
    const { health, attack, defense, specialAttack, specialDefense, speed } = props;

    return (
        <div className="grid-main-content-pokemon-info-stats">
            <div className="grid-centered-element grid-main-content-pokemon-info-stats-hp"><h3>{`HP: ${health}`}</h3></div>
            <div className="grid-centered-element grid-main-content-pokemon-info-stats-attack"><h3>{`Attack: ${attack}`}</h3></div>
            <div className="grid-centered-element grid-main-content-pokemon-info-stats-defense"><h3>{`Defense: ${defense}`}</h3></div>
            <div className="grid-centered-element grid-main-content-pokemon-info-stats-special-attack"><h3>{`Sp. Attack: ${specialAttack}`}</h3></div>
            <div className="grid-centered-element grid-main-content-pokemon-info-stats-special-defense"><h3>{`Sp. Defense: ${specialDefense}`}</h3></div>
            <div className="grid-centered-element grid-main-content-pokemon-info-stats-speed"><h3>{`Speed: ${speed}`}</h3></div>
        </div>
    );
}

function PokemonContentInfo(props: any) {
    const { id, name, types, height, weight, abilities, stats, species, description } = props.info;

    const { firstType, secondType } = types;
    const { firstAbility, secondAbility, thirdAbility } = abilities;
    const { health, attack, defense, specialAttack, specialDefense, speed } = stats;

    return (
        <div className="grid-main-content-pokemon-info">
            <PokemonContentInfoBasic id={id} name={name} firstType={firstType} secondType={secondType} />
            <PokemonContentInfoMetadata height={height} weight={weight} species={species} />
            <PokemonContentInfoAbilities firstAbility={firstAbility} secondAbility={secondAbility} thirdAbility={thirdAbility} />
            <div className="grid-centered-element grid-main-content-pokemon-info-description">{description}</div>
            <PokemonContentInfoStats health={health} attack={attack} defense={defense} specialAttack={specialAttack} specialDefense={specialDefense} speed={speed} />
        </div>
    );
}

export function PokemonPage() {
    const pokemonData = useSelector((state: IStoreState) => state.resource.pokemon.data);
    const pokemonMessage = useSelector((state: IStoreState) => state.resource.pokemon.message);

    if (pokemonData) {
        return (
            <div className="grid-main-content-pokemon">
                <PokemonContentPhotos sprites={pokemonData.sprites} />
                <PokemonContentInfo info={pokemonData} />
            </div>
        );
    } else {
        return <p>{pokemonMessage}</p>
    }
}
