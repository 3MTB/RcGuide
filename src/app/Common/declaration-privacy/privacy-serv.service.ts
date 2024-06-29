import { AdMob } from '@capacitor-community/admob';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrivacyServService {

  actionSource = new Subject<boolean>();

  constructor() { }

  $action = this.actionSource.asObservable();
  updatePrivacy(isChecked: boolean) {
    this.actionSource.next(isChecked);
  }
}
