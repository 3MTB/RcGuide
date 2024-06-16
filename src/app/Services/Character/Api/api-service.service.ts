import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character, ApiResultCharacter } from 'Interfaces/Character';
import { FilterCharacter } from 'Interfaces/shared';
import { environment as env } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }

  getCharacterById(getById: string) {
    return this.http.get<Character>(env.urlGetById + getById);
  }
  
  getPageCharacter(pageUrl: string = env.urlBase + '/character') {
    return this.http.get<ApiResultCharacter>(pageUrl);
  }

  //TODO: Para generar la url correcta para el filtrado
  makeUrlToFilter(dataToFilter: FilterCharacter) {
    //console.log('OBJ FILTER IN MAKE URL', dataToFilter);
    let filterToUse = '';
    if (dataToFilter.name) {
      filterToUse += `name=${dataToFilter.name}&`;
    }
    if (dataToFilter.gender) {
      filterToUse += `gender=${dataToFilter.gender}`
    }
    if (dataToFilter.species) {
      filterToUse += `species=${dataToFilter.species}&`;
    }
    if (dataToFilter.status) {
      filterToUse += `status=${dataToFilter.status}&`;
    }
    if (dataToFilter.type) {
      filterToUse += `type=${dataToFilter.type}&`;
    }
    /*  if (dataToFilter.location !== null) {
       filterToUse += `location=${dataToFilter.location}&`;
     } */

    //console.log('               URL GENERADA: ', filterToUse);
    //! Si no hay filtros me devuelve todos
    if (filterToUse == '') {
      return `${env.urlBase}/character`;
    }
    //! Si hay filtros me devuelve todos los registros que cumplan dicho filtro
    else {
      filterToUse = filterToUse.substring(0, filterToUse.length - 1);
      // console.log('FILTER GENERATED', `${env.urlBase}/character/?${filterToUse}`);
      return `${env.urlBase}/character/?${filterToUse}`;
    }
  }
  //TODO: Para generar la url correcta para el filtrado

}
