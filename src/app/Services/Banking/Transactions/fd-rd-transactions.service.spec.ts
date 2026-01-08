import { TestBed } from '@angular/core/testing';

import { FdRdTransactionsService } from './fd-rd-transactions.service';

describe('FdRdTransactionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FdRdTransactionsService = TestBed.get(FdRdTransactionsService);
    expect(service).toBeTruthy();
  });
});
