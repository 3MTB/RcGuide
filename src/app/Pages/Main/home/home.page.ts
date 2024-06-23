import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonMenuButton, IonHeader, IonTitle, IonToolbar, IonIcon, IonButton, IonCardHeader, IonCard, IonImg, IonCardSubtitle } from '@ionic/angular/standalone';
import { CharactersPage } from 'Pages/AboutCharacters/characters/characters.page';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AdMob, AdmobConsentStatus, AdmobConsentDebugGeography, BannerAdOptions, BannerAdSize, BannerAdPosition, BannerAdPluginEvents } from '@capacitor-community/admob';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonCardSubtitle, TranslateModule, RouterLink, IonImg, IonCard, IonCardHeader, IonButton, CharactersPage, IonIcon, IonContent, IonMenuButton, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class HomePage implements OnInit {

  message: string = '';
  constructor() { }

  ngOnInit() {
    this.initialAdd();
    this.showBanner();
  }
  async initialAdd() {
    try {
      await AdMob.initialize(
        {
          initializeForTesting: true
        }
      );

      const [trackingInfo, consentInfo] = await Promise.all([
        AdMob.trackingAuthorizationStatus(),
        AdMob.requestConsentInfo(),
      ]);
      if (trackingInfo.status === 'notDetermined') {
        alert('Sin permisos!')
        await AdMob.requestTrackingAuthorization();
      }
      const authorizationStatus = await AdMob.trackingAuthorizationStatus();
      if (
        authorizationStatus.status === 'authorized' &&
        consentInfo.isConsentFormAvailable &&
        consentInfo.status === AdmobConsentStatus.REQUIRED
      ) {
        await AdMob.showConsentForm();
      }

    } catch (e) {
      console.log(e);
    }
  }
  async showBanner() {
    try {

      AdMob.addListener(BannerAdPluginEvents.Loaded, () => {
        this.message += '\nBanner Loaded-.-';
      });



      const options: BannerAdOptions = {
        adId: 'ca-app-pub-9991973251908117/4621732019',
        adSize: BannerAdSize.BANNER,
        position: BannerAdPosition.BOTTOM_CENTER,
        margin: 0,
        //isTesting: true,
         npa: true
      };
      AdMob.showBanner(options);
      AdMob.addListener(BannerAdPluginEvents.SizeChanged, (size) => {
        this.message += `\nBanner size changed: ${JSON.stringify(size)}`;
      });

      await AdMob.showBanner(options).then(
        () => {
          console.log('banner shown from Button');
          this.message += 'Banner shown from Button';
        },
        (err) => console.log(err)
      );
    } catch (e) {
      console.log(e);
      this.message += 'ERROR en el catch';
    }
  }

}
