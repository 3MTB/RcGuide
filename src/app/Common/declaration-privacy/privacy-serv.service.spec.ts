import { TestBed } from '@angular/core/testing';

import { PrivacyServService } from './privacy-serv.service';

describe('PrivacyServService', () => {
  let service: PrivacyServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrivacyServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
