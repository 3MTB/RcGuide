import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectionServService {

  actionSource = new Subject<boolean>();
  $action = this.actionSource.asObservable();
  constructor() { }

  setNetworkStatus(isOnline: boolean) {
    this.actionSource.next(isOnline);
  }

}
