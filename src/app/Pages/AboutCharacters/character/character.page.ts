import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonImg } from '@ionic/angular/standalone';
import { Character } from 'Interfaces/Character';
import { CharacterStorageService } from 'Services/Character/character-storage.service';
import { Route, Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ServComunicationsService } from 'Services/Character/Comunication/serv-comunications.service';
import { ConnectionServService } from './../../../Common/connection-serv.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.page.html',
  styleUrls: ['./character.page.scss'],
  standalone: true,
  imports: [IonImg, IonCardContent, RouterLink, TranslateModule, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CharacterPage implements OnInit {

  @Input({ required: true }) character!: Character;
  @Input({ required: true }) isFavorite!: boolean;
  isOnline = true;
  constructor(
    private storageS: CharacterStorageService,
    private route: Router,
    private servNetwork: ConnectionServService
  ) {
  }
  ngOnInit(): void {
    this.servNetwork.$action.subscribe(
      x => {
        this.isOnline = x;
      }
    )
  }

  goDetail() {
    if (this.isOnline) {
      this.route.navigate(['characters', this.character.id.toString()]);
    }


  }
  changeFavoriteStatus() {
    if (this.isFavorite) {
      this.storageS.removeFavoriteCharacter(this.character.id).then(
        x => {
          this.isFavorite = !this.isFavorite;
        }
      );;
    } else {
      this.storageS.addFavoriteCharacter(this.character.id).then(
        x => {
          this.isFavorite = !this.isFavorite;
        }
      );
    }
  }

}
