import { PokemonType } from "../enums/pokemon.enums";

const typeColorMap = new Map<PokemonType, string>([
    [PokemonType.Normal, "grey"],
    [PokemonType.Fire, "firebrick"],
    [PokemonType.Water, "royalblue"],
    [PokemonType.Grass, "limegreen"],
    [PokemonType.Electric, "gold"],
    [PokemonType.Ice, "skyblue"],
    [PokemonType.Fighting, "orangered"],
    [PokemonType.Poison, "purple"],
    [PokemonType.Ground, "maroon"],
    [PokemonType.Flying, "mediumblue"],
    [PokemonType.Psychic, "hotpink"],
    [PokemonType.Bug, "olive"],
    [PokemonType.Rock, "peru"],
    [PokemonType.Ghost, "plum"],
    [PokemonType.Dark, "darkslateblue"],
    [PokemonType.Dragon, "midnightblue"],
    [PokemonType.Steel, "darkgray"],
    [PokemonType.Fairy, "violet"],
]);

export const mapPokemonTypeToColor = (type: PokemonType) => {
    return typeColorMap.get(type);
}