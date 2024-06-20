import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { MenuPage } from "Pages/Main/menu/menu.page"
import { ServStorageService } from 'Services/storage/serv-storage.service';
import { Network } from '@capacitor/network';
import { AlertController } from '@ionic/angular';
import { ConnectionServService } from './Common/connection-serv.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, MenuPage]
})
export class AppComponent implements OnInit {

  isOnline = true;
  constructor(
    private storage: ServStorageService,
    private alertController: AlertController,
    private servNetwork: ConnectionServService
  ) { }

  ngOnInit(): void {
    this.MyEvents();
  }

  MyEvents() {
    Network.getStatus().then(x => {
      this.isOnline = x.connected;
      this.servNetwork.setNetworkStatus(this.isOnline);
      //this.storage.setNetwork(this.isOnline);
    });

    Network.addListener('networkStatusChange', status => {
      this.isOnline = status.connected;
      this.servNetwork.setNetworkStatus(this.isOnline);
      /*   this.storage.setNetwork(this.isOnline); */
      if (!this.isOnline) {
        this.generateAlertConnection();
      }
    });
  }

  async generateAlertConnection() {
    const alert = await this.alertController.create({
      header: 'Without Connection',
      subHeader: 'Your connection is off',
      message: "You don't have connection. Some Functions can't functional in the correct way.",
      buttons: ['OK'],
    });
    await alert.present();
  }

}
