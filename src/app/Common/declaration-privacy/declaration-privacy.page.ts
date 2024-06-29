import { ActivatedRoute, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonText, IonList, IonItem, IonFooter, IonCheckbox, IonLabel, IonButton } from '@ionic/angular/standalone';
import { ServStorageService } from 'Services/storage/serv-storage.service';
import { PrivacyServService } from './privacy-serv.service';

@Component({
  selector: 'app-declaration-privacy',
  templateUrl: './declaration-privacy.page.html',
  styleUrls: ['./declaration-privacy.page.scss'],
  standalone: true,
  imports: [IonButton, IonLabel, RouterLink, IonCheckbox, IonFooter, IonItem, IonList, IonText, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class DeclarationPrivacyPage {

  agree = false;
  constructor(
    private servPri: PrivacyServService
  ) {
    this.agree = localStorage.getItem('terms') === 'true';

  }
  changeAgree() {
    localStorage.setItem('terms', String(this.agree));
    this.servPri.updatePrivacy(this.agree);
  }

}
