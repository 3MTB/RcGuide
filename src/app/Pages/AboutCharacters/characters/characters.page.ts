import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonButtons, IonButton, IonList, IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonText, IonCardSubtitle, IonInfiniteScroll, IonInfiniteScrollContent, IonMenuButton, IonIcon } from '@ionic/angular/standalone';
import { ServStorageService } from 'Services/storage/serv-storage.service';
import { CharacterStorageService } from 'Services/Character/character-storage.service';
import { TranslateModule } from '@ngx-translate/core';
import { CharacterPage } from 'Pages/AboutCharacters/character/character.page';
import { ApiServiceService } from 'Services/Character/Api/api-service.service';
import { Character } from 'Interfaces/Character';
import { Info } from 'Interfaces/shared';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { ServComunicationsService } from 'Services/Character/Comunication/serv-comunications.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
  standalone: true,
  imports: [IonIcon, IonInfiniteScrollContent, IonMenuButton, IonInfiniteScroll, IonCardSubtitle, IonText, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonItem, CharacterPage, IonList, IonButton, TranslateModule, CharacterPage, IonButtons, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CharactersPage implements OnInit {

  /*  test !: Promise<any>;
   AllFavorites: number[] = []; */
  AllFavorites: number[] = [];
  isOnline = true;
  allCharacters: Character[] = [];
  info: Info = {
    count: 0,
    pages: 0,
    next: null,
    prev: null
  };

  constructor(
    private storageService: CharacterStorageService,
    private apiServ: ApiServiceService,
    private ServGeneral: ServStorageService,
    private servComunication: ServComunicationsService

  ) {
    ServGeneral.getNetwork().then(x => {
      this.isOnline = x;
    })
  }


  ngOnInit(): void {
    this._getAllFavorites();
    this._initialCharacters();
    this.servComunication.action$.subscribe(
      () => {
        this._getAllFavorites();
      }
    )
  }
  getIfIsFavorite(id: number) {
    return this.AllFavorites?.includes(id);
  }

  _getAllFavorites() {
    this.storageService.getAllFavorites().then(
      x => {
        this.AllFavorites = x;
      }
    );


  }
  _initialCharacters() {
    if (this.isOnline) {
      this.apiServ.getPageCharacter().subscribe(x => {
        this.allCharacters = x.results;
        this.info = x.info;
      });
    }
  }

  LoadMore(event: InfiniteScrollCustomEvent) {
    if (this.isOnline && this.info.next !== null) {
      this.apiServ.getPageCharacter(this.info.next ?? undefined).pipe(
      ).subscribe(
        (x) => {
          this.info = x.info;
          this.allCharacters.push(...x.results);
          event.target.complete();
        });
    }
    else {
      event.target.disabled = true;
      event.target.complete();
    }
  }





















  /*  ngOnInit() {
     this.AllFavorites = this.storageService.getAllFavorites;
   }
   addValues() {
     this.storageService.addFavoriteCharacter(1);
     this.storageService.addFavoriteCharacter(3);
     this.storageService.addFavoriteCharacter(5);
   }
   updateValue() {
     this.AllFavorites = this.storageService.getAllFavorites;
   }
   removeValue() {
     this.storageService.removeFavoriteCharacter(1);
   } */


}
