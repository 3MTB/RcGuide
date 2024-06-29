import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, IonMenuButton, IonLabel, IonCardContent, IonCardTitle, IonCard, IonCardHeader, IonSkeletonText } from '@ionic/angular/standalone';
import { ApiServiceService } from 'Services/Character/Api/api-service.service';
import { Character } from 'Interfaces/Character';
import { TranslateModule } from '@ngx-translate/core';
import { ConnectionServService } from './../../../Common/connection-serv.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonSkeletonText, IonCardHeader, IonCard, IonCardTitle, IonCardContent, IonLabel, IonIcon, IonButton, IonMenuButton, RouterLink, IonContent, TranslateModule, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class DetailsPage implements OnInit {

  character: Character
    = {
      id: -1,
      name: '',
      status: '',
      species: '',
      type: '',
      gender: '',
      origin: {
        name: '',
        url: ''
      },
      location: {
        name: '',
        url: ''
      },
      image: '',
      episode: [],
      url: '',
      created: ''
    };
  backToFavorites: boolean = false;
  isOnline = true;
  isLoading = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private servCharacter: ApiServiceService,
    private servNetwork: ConnectionServService) { }

  ngOnInit() {
    this.servNetwork.$action.subscribe(x => {
      this.isOnline = x
      this.checkConnection();
    });
    let valueReceived = this.activatedRoute.snapshot.params['id'];
    if (isNaN(valueReceived) || !parseInt(valueReceived)) {
      {
        //!       Mostrar Alert
        alert('error en los datos obtenidos...')
        return;
      }
    }
    if (this.isOnline) {
      this.servCharacter.getCharacterById(valueReceived).subscribe(
        x => {
          this.isLoading = false;
          this.character = x;
        }
      );
    }
    else {
      this.checkConnection();
    }
    let resaltbackToFavorite = this.activatedRoute.snapshot.queryParamMap.get('backToFavorite');
    this.backToFavorites = resaltbackToFavorite?.toLocaleLowerCase() === 'true' ? true : false;
  }
  checkConnection() {
    if (!this.isOnline) {
      alert("You don't have connection");
      this.route.navigateByUrl('characters');
      //! this can be generate a issue !!!!
    }
  }
}
