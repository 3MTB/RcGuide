import { TestBed } from '@angular/core/testing';

import { ConnectionServService } from './connection-serv.service';

describe('ConnectionServService', () => {
  let service: ConnectionServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectionServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
