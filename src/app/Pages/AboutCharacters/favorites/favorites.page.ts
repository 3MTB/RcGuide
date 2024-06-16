import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonText, IonInfiniteScrollContent, IonCardContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonList, IonItem, IonInfiniteScroll, IonMenuButton, IonIcon, IonButton } from '@ionic/angular/standalone';
import { CharacterStorageService } from 'Services/Character/character-storage.service';
import { Character } from 'Interfaces/Character';
import { ApiServiceService } from 'Services/Character/Api/api-service.service';
import { Info } from 'Interfaces/shared';
import { ServStorageService } from 'Services/storage/serv-storage.service';
import { InfiniteScrollCustomEvent, AlertController } from '@ionic/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CharacterPage } from "../character/character.page";
import { RouterLink } from '@angular/router';
import { ServComunicationsService } from 'Services/Character/Comunication/serv-comunications.service';
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonInfiniteScroll, RouterLink, IonMenuButton, IonItem, IonList, TranslateModule, IonCardTitle, IonCardSubtitle, IonCardHeader, IonCard, IonCardContent, IonInfiniteScrollContent, IonText, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, CharacterPage]
})
export class FavoritesPage implements OnInit {

  AllFavoritesId: number[] = [];
  AllCharacters: Character[] = [];
  info: Info = {
    count: 0,
    pages: 0,
    next: '',
    prev: ''
  };
  isOnline = true;

  constructor(
    private servCharacterStorage: CharacterStorageService,
    private servCharacterApi: ApiServiceService,
    private ServGeneral: ServStorageService,
    private alertController: AlertController,
    private translate: TranslateService,
    private servComunication: ServComunicationsService
  ) {
    ServGeneral.getNetwork().then(x => {
      this.isOnline = x;
    })
  }

  ngOnInit() {
    this.servCharacterStorage.getAllFavorites().then(x => {
      this.AllFavoritesId = x ?? [];
      if (this.AllFavoritesId.length > 0) {
        this.initial();
      }
    });
    this.servComunication.action$.subscribe(() => {
      this.servCharacterStorage.getAllFavorites().then(x => {
        this.AllFavoritesId = x ?? [];
        if (this.AllFavoritesId.length > 0) {
          this.initial();
        }
      });
    })

  }
  initial() {
    this.servCharacterApi.getGroupOfCharacters(this.AllFavoritesId).subscribe(x => {
      this.AllCharacters = x;
    });
  }
  changeFavoriteStatus(character: Character) {

    this.translate.get('CharactersPage.FavoriteDelete').subscribe(message => {
      this.showAlert(character, message)
    });


  }
  showAlert(character: Character, message: string) {
    this.alertController.create({

      header: 'Alert',
      message: message + ' --' + character.name,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          handler: () => {
            this.eliminaFavorite(character);
          }
        }
      ]
    }).then(alert => alert.present());
  }
  eliminaFavorite(character: Character) {
    this.servCharacterStorage.removeFavoriteCharacter(character.id).then(
      x => {
        this.AllCharacters = this.AllCharacters.filter(x => x.id !== character.id);
      }
    );
  }
}
