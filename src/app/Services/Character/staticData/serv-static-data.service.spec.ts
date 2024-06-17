import { TestBed } from '@angular/core/testing';

import { ServStaticDataService } from './serv-static-data.service';

describe('ServStaticDataService', () => {
  let service: ServStaticDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServStaticDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
