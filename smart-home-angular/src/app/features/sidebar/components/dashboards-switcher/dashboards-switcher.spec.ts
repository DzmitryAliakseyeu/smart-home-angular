import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardsSwitcher } from './dashboards-switcher';

describe('DashboardsSwitcher', () => {
  let component: DashboardsSwitcher;
  let fixture: ComponentFixture<DashboardsSwitcher>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardsSwitcher]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardsSwitcher);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
