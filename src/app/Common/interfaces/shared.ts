import{ Origin } from "Interfaces/Character";

export interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
};
export interface FilterCharacter {
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin | string;
  location: number | null;
  episode: string[] | string;
}
