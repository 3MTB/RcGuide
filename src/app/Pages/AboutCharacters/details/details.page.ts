import { ActivatedRoute, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, IonMenuButton, IonLabel, IonCardContent, IonCardTitle, IonCard, IonCardHeader } from '@ionic/angular/standalone';
import { ApiServiceService } from 'Services/Character/Api/api-service.service';
import { Character } from 'Interfaces/Character';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonCardHeader, IonCard, IonCardTitle, IonCardContent, IonLabel, IonIcon, IonButton,IonMenuButton,RouterLink, IonContent,TranslateModule, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
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

  constructor(private activatedRoute: ActivatedRoute, private servCharacter: ApiServiceService) { }

  ngOnInit() {
    let valueReceived = this.activatedRoute.snapshot.params['id'];
    if (isNaN(valueReceived) || !parseInt(valueReceived)) {
      {
        //!       Mostrar Alert
        return;
      }
    }
    this.servCharacter.getCharacterById(valueReceived).subscribe(
      x => {
        this.character = x;
      }
    )

  }
}
