import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesCreationViewComponent } from './companies-creation-view.component';

describe('CompaniesCreationViewComponent', () => {
  let component: CompaniesCreationViewComponent;
  let fixture: ComponentFixture<CompaniesCreationViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompaniesCreationViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaniesCreationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
