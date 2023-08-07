import { ChainLink, EvolutionChain } from "pokenode-ts";

export function getNamesPokemonChain(evolutions : EvolutionChain ) {
  const names: any = {};

  const traverseChain = (chain : ChainLink) => {
    names[chain.species.name] = chain.species.name;
    if (chain.evolves_to.length > 0) {
      traverseChain(chain.evolves_to[0]);
    }
  };

  traverseChain(evolutions.chain);
  return names;
}