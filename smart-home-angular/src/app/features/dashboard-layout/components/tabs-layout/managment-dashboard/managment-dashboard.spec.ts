import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagmentDashboard } from './managment-dashboard';

describe('ManagmentDashboard', () => {
  let component: ManagmentDashboard;
  let fixture: ComponentFixture<ManagmentDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagmentDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(ManagmentDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
