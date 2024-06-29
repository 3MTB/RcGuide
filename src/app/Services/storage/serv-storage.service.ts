import { Injectable } from '@angular/core';

import { Storage as angS } from '@ionic/storage-angular';
@Injectable({
  providedIn: 'root'
})
export class ServStorageService {

  constructor(private str: angS) {
    this.str.create();
  }

  //!                  G E N E  R A L

  async set(key: string, value: any) {
    await this.str.set(key, value);
  }
  async get(key: string) {
    return await this.str.get(key);
  }




}
