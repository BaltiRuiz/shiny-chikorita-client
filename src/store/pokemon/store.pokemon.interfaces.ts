import { PokemonType } from "../../enums/pokemon.enums";

export interface IPokemonData {
    id: string;
    name: string;
    types: {
        firstType: PokemonType;
        secondType?: PokemonType;
    },
    height: number;
    weight: number;
    abilities: {
        firstAbility: any;
        secondAbility?: any;
        thirdAbility?: any;
    },
    stats: {
        health: number;
        attack: number;
        defense: number;
        specialAttack: number;
        specialDefense: number;
        speed: number;
    },
    sprites: Map<string, any>;
    species: string;
    description: string;
}

export interface IPokemonStoreState {
    data: IPokemonData;
    message: string | null;
}
