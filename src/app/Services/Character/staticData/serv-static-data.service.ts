import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServStaticDataService {


  private _status = ['alive', 'dead', 'unknown'];

  private _types = [
    "Genetic experiment",
    "Superhuman (Ghost trains summoner)",
    "Parasite",
    "Human with antennae",
    "Human with ants in his eyes",
    "Fish-Person",
    "Cromulon",
    "Self-aware arm",
    "Cat-Person",
    "Human with baby legs",
    "Bepisian",
    "Hivemind",
    "Mytholog",
    "Human with giant head",
    "Dog",
    "Bird-Person",
    "Korblock",
    "Boobloosian",
    "Elephant-Person",
    "Superhuman",
    "Gromflomite",
    "Centaur",
    "Organic gun",
    "Microverse inhabitant",
    "Vampire",
    "Light bulb-Alien",
    "Animal",
    "Robot-Crocodile hybrid",
    "Zigerion",
    "Giant",
    "Cone-nippled alien",
    "Demon",
    "Shapeshifter",
    "Game",
    "Amoeba-Person",
    "Cronenberg",
    "Clone",
    "Robot",
    "Interdimensional gaseous being",
    "Flansian",
    "Zombodian",
    "Garblovian",
    "Gazorpian",
    "Eat shiter-Person",
    "Goddess",
    "Gazorpian reproduction robot",
    "Hammerhead-Person",
    "Hole",
    "Tuskfish",
    "Alphabetrian",
    "Cat",
    "Time God",
    "Unknown-nippled alien",
    "Krootabulan",
    "Plutonian",
    "Jellybean",
    "Tentacle alien",
    "Miniverse inhabitant",
    "Cyborg",
    "Larva alien",
    "Snail alien",
    "Tinymouth",
    "Lizard-Person",
    "Alligator-Person",
    "Monster",
    "Conjoined twin",
    "Sentient ant colony",
    "Human Gazorpian",
    "Boobie buyer reptilian",
    "Meeseeks",
    "The Devil",
    "Cat controlled dead lady",
    "Numbericon",
    "Octopus-Person",
    "Hairy alien",
    "Pickle",
    "Bread",
    "Mega Gargantuan",
    "Rat",
    "Gear-Person",
    "Blue ape alien",
    "Ring-nippled alien",
    "Lobster-Alien",
    "Scrotian",
    "Shimshamian",
    "Omniscient being",
    "Slug",
    "Stair goblin",
    "Leprechaun",
    "Morty's toxic side",
    "Rick's toxic side",
    "Traflorkian",
    "Teenyverse inhabitant",
    "Trunk-Person",
    "Tumblorkian",
    "Chair",
    "Drumbloxian",
    "Floop Floopian",
    "Greebybobe",
    "Corn-person",
    "Phone-Person",
    "Teddy Bear",
    "Little Human",
    "Mexican",
    "Giant Cat Monster",
    "Old Amazons",
    "Mannie",
    "Necrophiliac",
    "Eel",
    "Pizza",
    "Grandma",
    "Phone",
    "Doopidoo",
    "Pripudlian",
    "Nano Alien",
    "Human with a flower in his head",
    "Hologram",
    "Shrimp",
    "Caterpillar",
    "Wasp",
    "Toy",
    "Monogatron",
    "Lizard",
    "Fly",
    "God",
    "Dummy",
    "Human with tusks",
    "Gramuflackian",
    "Dragon",
    "Snake",
    "Human-Snake hybrid",
    "Soulless Puppet",
    "Half Soulless Puppet",
    "Glorzo",
    "Planet",
    "Zeus",
    "Clay-Person",
    "Sexy Aquaman",
    "Narnian",
    "Starfish",
    "Squid",
    "Decoy",
    "Whenwolf",
    "Summon",
    "Morglutzian",
    "Weasel",
    "Super Sperm Monster",
    "CHUD",
    "Giant Incest Baby",
    "CHUD Human Mix",
    "Changeformer",
    "Artificial Intelligence",
    "Guinea Pig for the Polio Vaccine",
    "Turkey",
    "Turkey Human Mix",
    "Anime",
    "Memory",
    "Bird-Person Human Mix",
    "Crow",
    "Cookie",
    "Normal Size Bug",
    "Slartivartian",
    "Ferkusian",
    "Mascot",
    "Scarecrow",
    "Tiger",
    "Crow Horse",
    "Ferret Robot",
    "Passing Butter Robot"
  ]
  private _genders = [
    'female',
    'male',
    'genderless',
    'unknown'
  ]
  private _species = [
    "Human",
    "Alien",
    "Humanoid",
    "unknown",
    "Poopybutthole",
    "Mythological Creature",
    "Animal",
    "Robot",
    "Cronenberg",
    "Disease"
  ]
  constructor() { }

  get getStatus() {
    return this._status;
  }
  get getSpecies() {
    return this._species;
  }
  get getTypes() {
    return this._types;
  }
  get getGenders() {
    return this._genders;
  }
}
