import { PokemonCardView } from "./PokemonCardView";

export interface PokemonView {
  About: PokemonAbout;
  BaseStats: PokemonBaseStats;
  Evolutions: PokemonCardView[];
  Moves: CardViewMove[];
}

interface PokemonAbout {
  species: string;
  height: number;
  weight: number;
  abilities: string[]
}

interface PokemonBaseStats {
  hp: number;
  atk: number;
  def: number;
  satk: number;
  sdef: number;
  spd: number;
}

export interface CardViewMove {
  name:string;
  id:number;
  type: string;
  power: number | null;
  pp: number | null;
  accuracy: number | null;
}

