import { MoveClient,Move } from "pokenode-ts"
import { PokemonCardView } from "../Interfaces/modelView/PokemonCardView"
import { CardViewMove } from "../Interfaces/modelView/PokemonView"

const api = new MoveClient()

export async  function getListMovesCardViewByName(listPokemonName: string[]) {
  const PromisseList = listPokemonName.map(async (pokemonName) => {
    return await api.getMoveByName(pokemonName)
  })

  const listPokemonDetails: Promise<CardViewMove[]> =  Promise.all(PromisseList).then(function (results: Move[]): CardViewMove[] {
    return results.map(result => {
      const movesListCard: CardViewMove = {
        name: result.name,
        id: result.id,
        type: result.type.name,
        accuracy: result.accuracy,
        power: result.power,
        pp: result.pp
      }
      return movesListCard
    })
  })

  return listPokemonDetails
}