import { Component, EventEmitter, OnInit } from '@angular/core';
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
import { InfiniteScrollCustomEvent, AlertController } from '@ionic/angular';
import { ServComunicationsService } from 'Services/Character/Comunication/serv-comunications.service';
import { FilterPage } from 'Pages/AboutCharacters/filter/filter.page';
import { EMPTY, Observable, catchError } from 'rxjs';
import { ConnectionServService } from './../../../Common/connection-serv.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
  standalone: true,
  imports: [IonIcon, FilterPage, IonInfiniteScrollContent, IonMenuButton, IonInfiniteScroll, IonCardSubtitle, IonText, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonItem, CharacterPage, IonList, IonButton, TranslateModule, CharacterPage, IonButtons, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CharactersPage implements OnInit {

  AllFavorites: number[] = [];
  isOnline = true;
  allCharacters: Character[] = [];
  info: Info = {
    count: 0,
    pages: 0,
    next: null,
    prev: null
  };
  evResetValues: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private storageService: CharacterStorageService,
    private apiServ: ApiServiceService,
    private servComunication: ServComunicationsService,
    private alertController: AlertController,
    private servNetwork: ConnectionServService
  ) { }
  ngOnInit(): void {
    this._getAllFavorites();
    this._initialCharacters();
    this.servComunication.action$.subscribe(
      () => {
        this._getAllFavorites();
      }
    );
    this.servNetwork.$action.subscribe(x => {
      this.isOnline = x
    })
  }



  getIfIsFavorite(id: number) {
    return this.AllFavorites?.includes(id);
  }

  _getAllFavorites() {
    if (this.isOnline) {
      this.storageService.getAllFavorites().then(
        x => {
          this.AllFavorites = x;
        }
      );
    }
  }
  _initialCharacters() {
    //! MANDAR INFORMACION PARA REINICIAR LOS VALORES DEL FILTRE DE BUSQUEDA
    if (this.isOnline) {
      this.apiServ.getPageCharacter().subscribe(x => {
        this.allCharacters = x.results;
        this.info = x.info;
        this.UpdateValuesFilter(false);
      });
    }
  }
  UpdateValuesFilter(needed: boolean) {
    this.evResetValues.emit(needed);
  }
  //TODO:           ADD VERIFICATION TO KNOW IF HAS CONNECTIONS
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

  //! SEARCHER OPTIONS

  Search(url: string) {
    if (this.isOnline) {
      this.apiServ.getPageCharacter(url).pipe(
        catchError((error) => {
          console.log(error);
          if (error.error.error && error.error.error === 'There is nothing here') {
            //! Show alert without searchers and then show aLL THe Characters
            this.UpdateValuesFilter(true);

            this.showAlertNotFoundCharacters();
            this._initialCharacters();
            //! Show alert without searchers
          }
          return EMPTY;
        })
      ).subscribe(
        x => {
          this.allCharacters = x.results;
          this.info = x.info;
          this.UpdateValuesFilter(false);

        })
    }
  }

  async showAlertNotFoundCharacters() {
    //!                             ADD TRANSLATE
    const alert = await this.alertController.create({
      header: "Without Chracters Founds",
      message: 'We havent found any character with the result to that seach...',
      buttons: ['OK'],
    });
    alert.present();
  }

}
