import { Pokemon, PokemonClient } from "pokenode-ts"
import { PokemonCardView } from "../Interfaces/modelView/PokemonCardView"

const api = new PokemonClient()

export async  function getListPokemonCardViewByName(listPokemonName: string[]) {
  const PromisseList = listPokemonName.map(async (pokemonName) => {
    return await api.getPokemonByName(pokemonName)
  })

  const listPokemonDetails: Promise<PokemonCardView[]> = Promise.all(PromisseList).then(function (results: Pokemon[]): any {
    return results.map(result => {
      const pokemonListCard: PokemonCardView = {
        name: result.name,
        id: result.id,
        image: result.sprites.other?.dream_world.front_default,
        types: result.types.map(type => type.type.name)
      }
      return pokemonListCard
    })
  })

  return listPokemonDetails
}