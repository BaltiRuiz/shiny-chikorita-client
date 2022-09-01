import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./TypesPage.css";

import { IStoreState } from "../../store/store.interfaces";

import { mapPokemonTypeToColor } from "../../utils/mappings";

function TypesContentInfoDamageRelation(props: any) {
    const { damageKey, relationTitle, relationTypes } = props;

    return (
        <>
            <div className="grid-centered-element"><b>{relationTitle}</b></div>
            <div className="grid-main-content-types-info-damage-relations-content">
                {relationTypes.map((type: any) =>
                    <div key={`${damageKey}-${type}`} className="grid-centered-element">
                        <Link to={`/type/${type}`} style={{ color: mapPokemonTypeToColor(type) }}>
                            <b>{type.toUpperCase()}</b>
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}

function TypesContentInfoDamage(props: any) {
    const { type, damageRelations } = props;

    return (
        <div className="grid-main-content-types-info-damage">
            <div className="grid-centered-element grid-main-content-types-info-damage-title"><h2>Damage relations:</h2></div>
            <div className="grid-main-content-types-info-damage-relations">
                <TypesContentInfoDamageRelation damageKey={`${type}-double-damage-from`} relationTitle={"2x FROM:"} relationTypes={damageRelations.doubleDamageFrom} />
                <TypesContentInfoDamageRelation damageKey={`${type}-double-damage-to`} relationTitle={"2x TO:"} relationTypes={damageRelations.doubleDamageTo} />
                <TypesContentInfoDamageRelation damageKey={`${type}-half-damage-from`} relationTitle={"0.5x FROM:"} relationTypes={damageRelations.halfDamageFrom} />
                <TypesContentInfoDamageRelation damageKey={`${type}-half-damage-to`} relationTitle={"0.5x TO:"} relationTypes={damageRelations.halfDamageTo} />
                <TypesContentInfoDamageRelation damageKey={`${type}-no-damage-from`} relationTitle={"0x FROM:"} relationTypes={damageRelations.noDamageFrom} />
                <TypesContentInfoDamageRelation damageKey={`${type}-no-damage-to`} relationTitle={"0x TO:"} relationTypes={damageRelations.noDamageTo} />
            </div>
        </div>
    );
}

function TypesContentInfoMoves(props: any) {
    const { type, moves } = props;

    return (
        <div className="grid-main-content-types-info-moves">
            <div className="grid-centered-element grid-main-content-types-info-moves-title"><h2>Moves:</h2></div>
            <div className="grid-main-content-types-info-moves-content">
                <div className="grid-centered-element"><b>NAME</b></div>
                <div className="grid-centered-element"><b>CATEGORY</b></div>
                <div className="grid-centered-element"><b>POWER</b></div>
                <div className="grid-centered-element"><b>PP</b></div>
                <div className="grid-centered-element"><b>ACCURACY</b></div>
                {moves.map((move: any) =>
                    <React.Fragment key={`${type}-related-move-${move.id}`}>
                        <div className="grid-centered-element"><b>{move.name.toUpperCase()}</b></div>
                        <div className="grid-centered-element">{move.category}</div>
                        <div className="grid-centered-element">{move.power ? move.power : "-"}</div>
                        <div className="grid-centered-element">{move.pp}</div>
                        <div className="grid-centered-element">{move.accuracy ? move.accuracy : "-"}</div>
                    </React.Fragment>
                )}
            </div>
        </div>
    );
}

function TypesContentInfoPokemonType(props: any) {
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

function TypesContentInfoPokemon(props: any) {
    const { type, pokemons } = props;

    return (
        <div className="grid-main-content-types-info-pokemon">
            {pokemons.map((pokemon: any) =>
                <React.Fragment key={`${type}-related-pokemon-${pokemon.id}`}>
                    <div className="grid-centered-element">
                        <img src={pokemon.sprite} style={{ maxWidth: "100%", maxHeight: "100%", imageRendering: "-webkit-optimize-contrast" }} alt="pokemon-sprite" />
                    </div>
                    <div className="grid-main-content-types-info-pokemon-content">
                        <div className="grid-main-content-types-info-pokemon-content-title">
                            <div className="grid-centered-element">
                                <h2>{pokemon.id}</h2>
                            </div>
                            <div className="grid-centered-element">
                                <Link to={`/pokemon/${pokemon.name}`} style={{ color: "black" }}>
                                    <h2>{pokemon.name.toUpperCase()}</h2>
                                </Link>
                            </div>
                        </div>
                        <div className="grid-main-content-types-info-pokemon-content-types">
                            <TypesContentInfoPokemonType className="grid-centered-element grid-main-content-types-info-pokemon-content-types-first" type={pokemon.firstType} />
                            <TypesContentInfoPokemonType className="grid-centered-element grid-main-content-types-info-pokemon-content-types-second" type={pokemon.secondType} />
                        </div>
                    </div>
                </React.Fragment>
            )}
        </div>
    );
}

function TypesContentInfo(props: any) {
    const { info } = props;

    return (
        <div className="grid-main-content-types-info">
            <div className="grid-main-content-types-info-damage-moves">
                <TypesContentInfoDamage type={info.name} damageRelations={info.damageRelations} />
                <TypesContentInfoMoves type={info.name} moves={info.moves} />
            </div>
            <TypesContentInfoPokemon type={info.name} pokemons={info.pokemons} />
        </div>
    );
}

export function TypesPage() {
    const typeData = useSelector((state: IStoreState) => state.resource.type.data);
    const typeMessage = useSelector((state: IStoreState) => state.resource.type.message);

    if (typeData) {
        return (
            <div className="grid-main-content-types">
                <div className="grid-centered-element grid-main-content-types-title" style={{ color: mapPokemonTypeToColor(typeData.name) }}>
                    <h1>{typeData.name.toUpperCase()}</h1>
                </div>
                <TypesContentInfo info={typeData} />
            </div>
        );
    } else {
        return <p>{typeMessage}</p>
    }
}
