import { Injectable } from '@angular/core';

import { Storage as angS } from '@ionic/storage-angular';
@Injectable({
  providedIn: 'root'
})
export class ServStorageService {

  constructor(private storage: angS) {
    this.storage.create();
  }

  //!                  G E N E  R A L

  async set(key: string, value: any) {
    await this.storage.set(key, value);
  }
  async get(key: string) {
    return await this.storage.get(key);
  }

}
