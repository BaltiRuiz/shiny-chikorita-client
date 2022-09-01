import { PokemonGeneration, PokemonGenerationExtended, PokemonType } from "../enums/pokemon.enums";

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

const generationMap = new Map<string, string>([
    [PokemonGeneration.GenerationI, PokemonGenerationExtended.GenerationI],
    [PokemonGeneration.GenerationII, PokemonGenerationExtended.GenerationII],
    [PokemonGeneration.GenerationIII, PokemonGenerationExtended.GenerationIII],
    [PokemonGeneration.GenerationIV, PokemonGenerationExtended.GenerationIV],
    [PokemonGeneration.GenerationV, PokemonGenerationExtended.GenerationV],
    [PokemonGeneration.GenerationVI, PokemonGenerationExtended.GenerationVI],
    [PokemonGeneration.GenerationVII, PokemonGenerationExtended.GenerationVII],
    [PokemonGeneration.GenerationVIII, PokemonGenerationExtended.GenerationVIII],
]);

export const mapPokemonTypeToColor = (type: PokemonType) => {
    return typeColorMap.get(type);
}

export const mapGenerationToExtendedVersion = (generation: PokemonGeneration) => {
    return generationMap.get(generation);
}
