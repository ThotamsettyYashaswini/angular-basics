import { TestBed } from '@angular/core/testing';

import { LayoutReportServiceService } from './layout-report-service.service';

describe('LayoutReportServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LayoutReportServiceService = TestBed.get(LayoutReportServiceService);
    expect(service).toBeTruthy();
  });
});
