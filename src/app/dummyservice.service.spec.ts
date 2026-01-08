import { TestBed } from '@angular/core/testing';

import { DummyserviceService } from './dummyservice.service';

describe('DummyserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DummyserviceService = TestBed.get(DummyserviceService);
    expect(service).toBeTruthy();
  });
});
