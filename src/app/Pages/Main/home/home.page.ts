import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonMenuButton, IonHeader, IonTitle, IonToolbar, IonIcon, IonButton, IonCardHeader, IonCard, IonImg, IonCardSubtitle } from '@ionic/angular/standalone';
import { CharactersPage } from 'Pages/AboutCharacters/characters/characters.page';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonCardSubtitle,TranslateModule,RouterLink, IonImg, IonCard, IonCardHeader, IonButton, CharactersPage, IonIcon, IonContent, IonMenuButton, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class HomePage implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('home');
  }

}
