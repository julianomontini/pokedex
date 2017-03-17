export interface PokemonDetail{

    forms: [{
        url: string,
        name: string
    }],
    abilities: [{
        slot: number,
        isHidden: boolean,
        ability: {
            url: string,
            name: string
        }
    }],
    stats: [{
        stat: {
            url: string,
            name: string
        },effort: number,
        baseStat: number
    }],
    name: string,
    weight: number,
    moves: [{
        move: {
            url: string,
            name: string
        },versionGroupDetails:[{
            moveLeanMethod: {
                url: string,
                name: string
            },levelLearnedAt: number,
            versionGroup: {
                url: string,
                name: string
            }
        }]
    }],
    sprites: {
        backFemale: string,
        backShinyFemale: string,
        backDefault: string,
        frontFemale: string,
        frontShinyFemale: string,
        backShiny: string,
        frontDefault: string,
        frontShiny: string 
    },
    held_items: [{
        item: {
            url: string,
            name: string
        },versionDetails:[{
            version: {
                url: string,
                name: string
            },rarity: number
        }]
    }],
    location_area_encounters: string,
    height: number,
    isDefault: boolean,
    species: {
        url: string,
        name: string
    },
    id: number,
    order: number,
    game_indices: [{
        version: {
            url: string,
            name: string
        }, gameIndex: number
    }],
    baseExperience: number,
    types: [{
        slot: number,
        type: {
            url: string,
            name: string
        }
    }]

}