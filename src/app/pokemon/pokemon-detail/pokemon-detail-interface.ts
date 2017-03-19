export interface PokemonDetail{

    forms: [{
        url: string,
        name: string
    }],
    abilities: [{
        slot: number,
        is_hidden: boolean,
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
        base_stat: number
    }],
    name: string,
    weight: number,
    moves: [{
        move: {
            url: string,
            name: string
        },version_group_details:[{
            move_lean_method: {
                url: string,
                name: string
            },level_learned_at: number,
            version_group: {
                url: string,
                name: string
            }
        }]
    }],
    sprites: {
        back_female: string,
        back_shiny_female: string,
        back_default: string,
        front_female: string,
        front_shiny_female: string,
        back_shiny: string,
        front_default: string,
        front_shiny: string 
    },
    held_items: [{
        item: {
            url: string,
            name: string
        },version_details:[{
            version: {
                url: string,
                name: string
            },rarity: number
        }]
    }],
    location_area_encounters: string,
    height: number,
    is_default: boolean,
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
        }, game_index: number
    }],
    base_experience: number,
    types: [{
        slot: number,
        type: {
            url: string,
            name: string
        }
    }]

}