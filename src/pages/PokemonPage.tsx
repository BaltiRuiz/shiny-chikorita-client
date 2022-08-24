import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useAPIStateFetching } from "../App";

import { IStoreState } from "../store/store.interfaces";

import { reqGetPokemon } from "../store/pokemon/store.pokemon.thunk.actions";

import { PokemonGeneration, PokemonGenerationExtended } from "../enums/pokemon.enums";

import { mapPokemonTypeToColor } from "../utils/mappings";

////////////////////////////////////////////////////////////////////////////

function PokemonFinder() {
    const [id, setID] = useState("");

    const navigate = useNavigate();

    const handleFindButtonClick = () => {
        navigate(`../${id}`);
    }

    const isAPIFetching = useAPIStateFetching();

    return (
        <div className="grid-main-search">
            <div className="grid-centered-element grid-main-search-id">
                <input
                    type="text"
                    id="pokemon-id"
                    placeholder="Name or ID"
                    disabled={isAPIFetching}
                    onChange={(e) => setID(e.currentTarget.value)}
                />
            </div>
            <div className="grid-centered-element grid-main-search-button">
                <button
                    type="button"
                    disabled={isAPIFetching}
                    onClick={handleFindButtonClick}
                >
                    Find Pokémon
                </button>
            </div>
        </div>
    );
}

function PokemonContentPhotosBar(props: any) {
    const { sprites, generation, genre, onGenerationSelection, onGenreButtonClick } = props;

    const isAPIFetching = useAPIStateFetching();

    const disableFemaleButton = Object.values(sprites[generation].female).every((femaleSprite: any) => femaleSprite === null);

    return (
        <div className="grid-main-content-photo-bar">
            <div className="grid-centered-element grid-main-content-photo-bar-generations">
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
            <div className="grid-centered-element grid-main-content-photo-bar-genres">
                <form>
                    <input
                        type="radio"
                        id="sprites-default"
                        name="sprites-genre"
                        value="default"
                        checked={genre === "default"}
                        disabled={isAPIFetching}
                        onClick={onGenreButtonClick}
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
                        onClick={onGenreButtonClick}
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
        <div className="grid-main-content-photo">
            <PokemonContentPhotosBar sprites={sprites} generation={generation} genre={genre} onGenerationSelection={handleGenerationSelection} onGenreButtonClick={handleGenreButtonClick} />
            <div className="grid-main-content-photo-sprites">
                <div className="grid-centered-element grid-main-content-photo-sprites-normal-back">
                    <img src={sprites[generation][genre].backDefault} alt="pokemon-sprite" />
                </div>
                <div className="grid-centered-element grid-main-content-photo-sprites-normal-front">
                    <img src={sprites[generation][genre].frontDefault} alt="pokemon-sprite" />
                </div>
                <div className="grid-centered-element grid-main-content-photo-sprites-shiny-back">
                    <img src={sprites[generation][genre].backShiny} alt="pokemon-sprite" />
                </div>
                <div className="grid-centered-element grid-main-content-photo-sprites-shiny-front">
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
            <div className={className} style={{ color: mapPokemonTypeToColor(type) }}><h1>{type.toUpperCase()}</h1></div>
        );
    } else {
        return null;
    }
}

function PokemonContentInfoBasic(props: any) {
    const { id, name, firstType, secondType } = props;

    const navigate = useNavigate();

    const handlePreviousNextButtonClick = (newID: number) => {
        navigate(`../${newID}`);
    }

    const isAPIFetching = useAPIStateFetching();

    return (
        <div className="grid-main-content-info-basic">
            <div className="grid-centered-element grid-main-content-info-basic-previous">
                <button
                    type="button"
                    disabled={isAPIFetching}
                    onClick={() => handlePreviousNextButtonClick(+id - 1)}
                >
                    Previous
                </button>
            </div>
            <div className="grid-centered-element grid-main-content-info-basic-id"><h1>{id}</h1></div>
            <div className="grid-centered-element grid-main-content-info-basic-name"><h1>{name.toUpperCase()}</h1></div>
            <PokemonContentInfoBasicType className="grid-centered-element grid-main-content-info-basic-first-type" type={firstType} />
            <PokemonContentInfoBasicType className="grid-centered-element grid-main-content-info-basic-second-type" type={secondType} />
            <div className="grid-centered-element grid-main-content-info-basic-next">
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
        <div className="grid-main-content-info-metadata">
            <div className="grid-centered-element grid-main-content-info-metadata-height"><h3>{`Height: ${height} m`}</h3></div>
            <div className="grid-centered-element grid-main-content-info-metadata-weight"><h3>{`Weight: ${weight} kg`}</h3></div>
            <div className="grid-centered-element grid-main-content-info-metadata-species"><h3>{`Species: ${species}`}</h3></div>
        </div>
    );
}

function PokemonContentInfoAbility(props: any) {
    const { nameClassName, descriptionClassName, ability } = props;

    if (ability) {
        return (
            <>
                <div className={nameClassName}><b>{ability.hidden ? "(Hidden) " : ""}{ability.name.toUpperCase()}</b></div>
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
        <div className="grid-main-content-info-abilities">
            <div className="grid-centered-element grid-main-content-info-abilities-title"><h2>Abilities:</h2></div>
            <div className="grid-main-content-info-abilities-details">
                <PokemonContentInfoAbility
                    nameClassName="grid-centered-element grid-main-content-info-abilities-details-first-name"
                    descriptionClassName="grid-centered-element grid-main-content-info-abilities-details-first-description"
                    ability={firstAbility}
                />
                <PokemonContentInfoAbility
                    nameClassName="grid-centered-element grid-main-content-info-abilities-details-second-name"
                    descriptionClassName="grid-centered-element grid-main-content-info-abilities-details-second-description"
                    ability={secondAbility}
                />
                <PokemonContentInfoAbility
                    nameClassName="grid-centered-element grid-main-content-info-abilities-details-third-name"
                    descriptionClassName="grid-centered-element grid-main-content-info-abilities-details-third-description"
                    ability={thirdAbility}
                />
            </div>
        </div>
    );
}

function PokemonContentInfoStats(props: any) {
    const { health, attack, defense, specialAttack, specialDefense, speed } = props;

    return (
        <div className="grid-main-content-info-stats">
            <div className="grid-centered-element grid-main-content-info-stats-hp"><h3>{`HP: ${health}`}</h3></div>
            <div className="grid-centered-element grid-main-content-info-stats-attack"><h3>{`Attack: ${attack}`}</h3></div>
            <div className="grid-centered-element grid-main-content-info-stats-defense"><h3>{`Defense: ${defense}`}</h3></div>
            <div className="grid-centered-element grid-main-content-info-stats-special-attack"><h3>{`Sp. Attack: ${specialAttack}`}</h3></div>
            <div className="grid-centered-element grid-main-content-info-stats-special-defense"><h3>{`Sp. Defense: ${specialDefense}`}</h3></div>
            <div className="grid-centered-element grid-main-content-info-stats-speed"><h3>{`Speed: ${speed}`}</h3></div>
        </div>
    );
}

function PokemonContentInfo(props: any) {
    const { id, name, types, height, weight, abilities, stats, species, description } = props.info;

    const { firstType, secondType } = types;
    const { firstAbility, secondAbility, thirdAbility } = abilities;
    const { health, attack, defense, specialAttack, specialDefense, speed } = stats;

    return (
        <div className="grid-main-content-info">
            <PokemonContentInfoBasic id={id} name={name} firstType={firstType} secondType={secondType} />
            <PokemonContentInfoMetadata height={height} weight={weight} species={species} />
            <PokemonContentInfoAbilities firstAbility={firstAbility} secondAbility={secondAbility} thirdAbility={thirdAbility} />
            <div className="grid-centered-element grid-main-content-info-description">{description}</div>
            <PokemonContentInfoStats health={health} attack={attack} defense={defense} specialAttack={specialAttack} specialDefense={specialDefense} speed={speed} />
        </div>
    );
}

function PokemonContent() {
    const pokemonData = useSelector((state: IStoreState) => state.pokemon.data);
    const pokemonMessage = useSelector((state: IStoreState) => state.pokemon.message);

    if (pokemonData) {
        return (
            <div className="grid-main-content">
                <PokemonContentPhotos sprites={pokemonData.sprites} />
                <PokemonContentInfo info={pokemonData} />
            </div>
        );
    } else {
        return <p>{pokemonMessage}</p>
    }
}

////////////////////////////////////////////////////////////////////////////

export function PokemonPage(props: any) {
    const { id } = props;

    const dispatch = useDispatch<any>();

    useEffect(() => {
        if (id !== undefined) {
            dispatch(reqGetPokemon(id));
        }
    }, [id]);

    return (
        <div className="grid-main">
            <PokemonFinder/>
            <PokemonContent/>
        </div>
    );
}
