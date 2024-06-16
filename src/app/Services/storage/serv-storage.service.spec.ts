import { TestBed } from '@angular/core/testing';

import { ServStorageService } from './serv-storage.service';

describe('ServStorageService', () => {
  let service: ServStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
