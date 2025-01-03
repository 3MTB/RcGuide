
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Character } from 'Interfaces/Character';
import { ServComunicationsService } from 'Services/Character/Comunication/serv-comunications.service';


@Injectable({
  providedIn: 'root'
})
export class CharacterStorageService {

  private _allFavorites: number[] = [];

  constructor(
    private servStorage: Storage,
    private servComunication: ServComunicationsService
  ) {
    //! BECAIFUL
    servStorage.create();
  }
  addFavoriteCharacter(addIdCharacter: number) {
    this.getAllFavorites().then(x => {
      this._allFavorites = x ?? [];
      this._allFavorites.push(addIdCharacter);
      this.servStorage.set('favCharacters', this._allFavorites).then(x => {
        this.servComunication.updateFavorites();
      });

    });
    return this.servStorage.get('favCharacters');
  }

  removeFavoriteCharacter(removeIdCharacter: number) {
    this.getAllFavorites().then(x => {
      this._allFavorites = x ?? [];
      this._allFavorites = this._allFavorites.filter((x) => x != removeIdCharacter);
      this.servStorage.set('favCharacters', this._allFavorites).then(x => {
        this.servComunication.updateFavorites();
      });

    });
    return this.servStorage.get('favCharacters');
  }

  async getAllFavorites() {
    return await this.servStorage.get('favCharacters');
  }

}
