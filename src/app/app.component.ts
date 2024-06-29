import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet, IonModal, IonToolbar, IonHeader, IonTitle, IonButtons, IonButton, IonContent, IonItem, IonCheckbox, IonLabel, IonFooter } from '@ionic/angular/standalone';
import { MenuPage } from "Pages/Main/menu/menu.page"
import { ServStorageService } from 'Services/storage/serv-storage.service';
import { Network } from '@capacitor/network';
import { AlertController, CheckboxCustomEvent, ModalController } from '@ionic/angular';
import { ConnectionServService } from './Common/connection-serv.service';
import { CharacterPage } from 'Pages/AboutCharacters/character/character.page';
import { DeclarationPrivacyPage } from './Common/declaration-privacy/declaration-privacy.page';
import { Route, Router } from '@angular/router';
import { PrivacyServService } from './Common/declaration-privacy/privacy-serv.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonFooter, IonLabel, IonCheckbox, DeclarationPrivacyPage, IonItem, IonContent, IonButton, IonButtons, IonTitle, IonHeader, IonToolbar, IonModal, IonApp, IonRouterOutlet, MenuPage]
})
export class AppComponent implements OnInit {

  isOnline = true;
  agree = false;
  constructor(
    private alertController: AlertController,
    private servNetwork: ConnectionServService,
    private route: Router,
    private servPri: PrivacyServService
  ) { }

  ngOnInit(): void {
    this.servPri.$action.subscribe(x => {
      this.agree = x;
    })
    this.MyEvents();
    this.agree = localStorage.getItem('terms') === 'true';

    if (this.agree === false) {
      this.route.navigate(['/terms']);
    }
    else {
      this.route.navigate(['/home']);
    }
  }


  MyEvents() {
    Network.getStatus().then(x => {
      this.isOnline = x.connected;
      this.servNetwork.setNetworkStatus(this.isOnline);
    });

    Network.addListener('networkStatusChange', status => {
      this.isOnline = status.connected;
      this.servNetwork.setNetworkStatus(this.isOnline);
      if (!this.isOnline) {
        this.generateAlertConnection();
      }
    });
  }

  async generateAlertConnection() {
    const alert = await this.alertController.create({
      header: 'Without Connection',
      subHeader: 'Your connection is off',
      message: "You don't have connection. Some Functions are not going to work in the correct way.",
      buttons: ['OK'],
    });
    await alert.present();
  }
}
