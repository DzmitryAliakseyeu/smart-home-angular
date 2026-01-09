import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDashboardModalLayout } from './add-dashboard-modal-layout';

describe('AddDashboardModalLayout', () => {
  let component: AddDashboardModalLayout;
  let fixture: ComponentFixture<AddDashboardModalLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDashboardModalLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDashboardModalLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
