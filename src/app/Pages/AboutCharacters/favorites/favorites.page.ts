import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonText, IonInfiniteScrollContent, IonCardContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonList, IonItem, IonInfiniteScroll, IonMenuButton, IonIcon } from '@ionic/angular/standalone';
import { CharacterStorageService } from 'Services/Character/character-storage.service';
import { Character } from 'Interfaces/Character';
import { ApiServiceService } from 'Services/Character/Api/api-service.service';
import { Info } from 'Interfaces/shared';
import { ServStorageService } from 'Services/storage/serv-storage.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CharacterPage } from "../character/character.page";
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [IonIcon, IonInfiniteScroll,RouterLink, IonMenuButton, IonItem, IonList, TranslateModule, IonCardTitle, IonCardSubtitle, IonCardHeader, IonCard, IonCardContent, IonInfiniteScrollContent, IonText, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, CharacterPage]
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
  constructor(private servCharacterStorage: CharacterStorageService,
    private servCharacterApi: ApiServiceService,
    private ServGeneral: ServStorageService

  ) {
    ServGeneral.getNetwork().then(x => {
      this.isOnline = x;
    })
  }

  ngOnInit() {
    this.servCharacterStorage.getAllFavorites().then(x => {
      this.AllFavoritesId = x ?? [];
      console.log('Supuesro favoritos : ', x);
      if (this.AllFavoritesId.length > 0) {
        this.initial();
      } else {
        //! MOSTRAR ALERTA
        alert('No hay personajes marcados como favoritos');
      }
    });

  }
  initial() {
    this.servCharacterApi.getGroupOfCharacters(this.AllFavoritesId).subscribe(x => {
      this.AllCharacters = x;
      console.log('Personajes favoritos : ', x);
    });
  }

}
