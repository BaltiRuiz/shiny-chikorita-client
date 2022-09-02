import {
    PokemonGeneration,
    PokemonGenerationExtended,
    PokemonTarget,
    PokemonTargetExtended,
    PokemonType,
} from "../enums/pokemon.enums";

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

const targetMap = new Map<string, string>([
    [PokemonTarget.AllAllies, PokemonTargetExtended.AllAllies],
    [PokemonTarget.AllOpponents, PokemonTargetExtended.AllOpponents],
    [PokemonTarget.AllOtherPokemon, PokemonTargetExtended.AllOtherPokemon],
    [PokemonTarget.AllPokemon, PokemonTargetExtended.AllPokemon],
    [PokemonTarget.Ally, PokemonTargetExtended.Ally],
    [PokemonTarget.EntireField, PokemonTargetExtended.EntireField],
    [PokemonTarget.OpponentsField, PokemonTargetExtended.OpponentsField],
    [PokemonTarget.RandomOpponent, PokemonTargetExtended.RandomOpponent],
    [PokemonTarget.SelectedPokemon, PokemonTargetExtended.SelectedPokemon],
    [PokemonTarget.SelectedPokemonMeFirst, PokemonTargetExtended.SelectedPokemonMeFirst],
    [PokemonTarget.SpecificMove, PokemonTargetExtended.SpecificMove],
    [PokemonTarget.User, PokemonTargetExtended.User],
    [PokemonTarget.UserAndAllies, PokemonTargetExtended.UserAndAllies],
    [PokemonTarget.UserOrAlly, PokemonTargetExtended.UserOrAlly],
    [PokemonTarget.UsersField, PokemonTargetExtended.UsersField],
]);

export const mapPokemonTypeToColor = (type: PokemonType) => {
    return typeColorMap.get(type);
}

export const mapGenerationToExtendedVersion = (generation: PokemonGeneration) => {
    return generationMap.get(generation);
}

export const mapTargetToExtendedVersion = (target: PokemonTarget) => {
    return targetMap.get(target);
}
