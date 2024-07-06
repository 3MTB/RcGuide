import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSearchbar, IonSelect, IonSelectOption, IonButton } from '@ionic/angular/standalone';
import { ApiResultCharacter, ObjValuesToSearch } from 'Interfaces/Character';
import { ApiServiceService } from 'Services/Character/Api/api-service.service';
import { TranslateModule } from '@ngx-translate/core';
import { FilterCharacter } from 'Interfaces/shared';
import { ServStaticDataService } from 'Services/Character/staticData/serv-static-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
  standalone: true,
  imports: [IonButton, IonSearchbar, IonSelect, IonSelectOption, TranslateModule, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class FilterPage implements OnInit {

  objSearchOptions: ObjValuesToSearch = {
    status: [],
    species: [],
    type: [],
    gender: [],
  }

  filterSearch: FilterCharacter = {
    name: '',
    status: '',
    species: '',
    type: '',
    gender: '',
    origin: { name: '', url: '' },
    location: null,
    episode: ''
  };

  isOptionsOpen = false;

  @Input({ required: true }) evUpdateFilters!: any;
  @Output() urlSearch: EventEmitter<string> = new EventEmitter<string>;

  constructor(
    private servCharacter: ApiServiceService,
    private servStaticData: ServStaticDataService
  ) { }

  ngOnInit() {
    this.evUpdateFilters.subscribe((x: any) => {
      if (x) {
        this.clearFilters();
      }
    });

    this.objSearchOptions = {
      status: this.servStaticData.getStatus,
      species: this.servStaticData.getSpecies,
      type: this.servStaticData.getTypes,
      gender: this.servStaticData.getGenders
    }

  }

  Search() {
    let url = this.servCharacter.makeUrlToFilter(this.filterSearch);
    this.urlSearch.emit(url);
  }
  clearFilters() {
    this.filterSearch = {
      name: '',
      status: '',
      species: '',
      type: '',
      gender: '',
      origin: { name: '', url: '' },
      location: null,
      episode: ''
    }
    this.Search();
  }

}
