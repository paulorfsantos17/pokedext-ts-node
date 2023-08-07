import { FastifyInstance } from 'fastify'
import { PokemonClient, Pokemon, EvolutionClient, EVOLUTION_TRIGGERS, EvolutionChain } from 'pokenode-ts'
import { z } from 'zod'
import { PokemonView } from '../Interfaces/modelView/PokemonView'
import { getNamesPokemonChain } from '../utils/getNamesPokemonChain'
import { removeIDFromUrl } from '../utils/removeIDFromUrl'
import { getListPokemonCardViewByName } from '../utils/getListPokemonCardViewByName'
import { getListMovesCardViewByName } from '../utils/getListMovesCardViewByName'


export async function pokemonRoutes(app: FastifyInstance) {
  const api = new PokemonClient()
  const apiEvolutions = new EvolutionClient()


  app.get('/pokemons', async (request, reply) => {
    try {
      const listPokemons = await api.listPokemons()
      const listPokemonName = listPokemons.results.map(pokemon => pokemon.name)



      const listPokemonDetails = await getListPokemonCardViewByName(listPokemonName)

      const getPokemonList = {
        next: listPokemons.next,
        pokemons: listPokemonDetails
      }

      return reply.status(200).send(getPokemonList)
    } catch (e) {
      console.log(e)
    }
  });

  app.get('/pokemon/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string()
    })
    const { id } = paramsSchema.parse(request.params)
    
    const pokemonPromise =  api.getPokemonById(parseInt(id))
    const pokemonSpeciesPromise =  api.getPokemonSpeciesById(parseInt(id))

    const [pokemon , pokemonSpecies] = await  Promise.all([pokemonPromise, pokemonSpeciesPromise])

    const urlChainEvolution: string = pokemonSpecies.evolution_chain.url
    const idChainEvolutions: number = removeIDFromUrl(urlChainEvolution)
    const evolutions = await apiEvolutions.getEvolutionChainById(idChainEvolutions)
    const ListPokemonEvolutionChainNames: string[] = Object.values(getNamesPokemonChain(evolutions))
    const listPokemonDetails = await getListPokemonCardViewByName(ListPokemonEvolutionChainNames)
    
    const namesMovesPokemonList: string[] = pokemon.moves.map(move => move.move.name)
    const ListMovesCard = await getListMovesCardViewByName(namesMovesPokemonList)



    const PokemonView: PokemonView = {
      About: {
        abilities: pokemon.abilities.map(ability => ability.ability.name),
        height: pokemon.height,
        weight: pokemon.weight,
        species: pokemon.species.name
      },
      BaseStats: {
        hp: pokemon.stats[0].base_stat,
        atk: pokemon.stats[1].base_stat,
        def: pokemon.stats[2].base_stat,
        satk: pokemon.stats[3].base_stat,
        sdef: pokemon.stats[4].base_stat,
        spd: pokemon.stats[5].base_stat,
      }, 
      Evolutions: listPokemonDetails,
      Moves: ListMovesCard
    }

    return reply.status(200).send(PokemonView)
  })
}


