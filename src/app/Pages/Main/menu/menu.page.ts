import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonMenu, IonSelect, IonSelectOption, IonHeader, IonTitle, IonToolbar, IonIcon, IonList, IonItem, IonButton, IonListHeader, IonLabel, IonFooter, IonSegment, IonSegmentButton, IonBadge } from '@ionic/angular/standalone';
import { Device } from '@capacitor/device';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { CharacterStorageService } from 'Services/Character/character-storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [IonBadge, IonSegmentButton, IonSegment, IonFooter, IonLabel, IonListHeader, IonButton, IonMenu, TranslateModule, IonSelect, IonSelectOption, RouterLink, IonItem, IonList, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MenuPage implements OnInit {

  isDark = true;
  languages: { name: string, value: string }[] = [
    {
      name: 'English',
      value: 'en'
    },
    {
      name: 'Español',
      value: 'es'
    }
  ];
  selectedLanguage: string = 'en';
  totalFavorites = 0;

  test !: Promise<any>;

  constructor(private translateServ: TranslateService,
     public servCharacterStorage: CharacterStorageService) { }

  async ngOnInit() {

    //! INICIADOR DE EVENTOS
    await this.myEvents();
    //! INICIADOR DE EVENTOS

    this.changeTheme();
    this.changeLang();

    this.servCharacterStorage.getAllFavorites().then(x => {
      this.totalFavorites = x.length;
    });

    this.test = this.servCharacterStorage.getAllFavorites();

  }

  async myEvents() {
    //! Gestor modo ( DARK / LIGHT ) obtenido del dispositivo
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.isDark = prefersDark.matches;
    prefersDark.addEventListener('change', () => {
      this.isDark = prefersDark.matches;
      this.changeTheme();
    });

    //! Verifica idioma del dispositivo
    const data = await Device.getLanguageCode();
    if (this.languages.some(x => x.value === data.value)) {
      this.selectedLanguage = data.value;
    }
  }

  btnThemePush() {
    this.isDark = !this.isDark;
    this.changeTheme();
  }
  changeTheme() {
    document.documentElement.classList.toggle('ion-palette-dark', this.isDark);
  }
  changeLang() {
    this.translateServ.use(this.selectedLanguage);
  }


}
