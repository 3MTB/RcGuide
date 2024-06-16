import { TestBed } from '@angular/core/testing';

import { ServComunicationsService } from './serv-comunications.service';

describe('ServComunicationsService', () => {
  let service: ServComunicationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServComunicationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
