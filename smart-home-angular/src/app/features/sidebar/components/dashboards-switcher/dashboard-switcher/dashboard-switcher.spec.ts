import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSwitcher } from './dashboard-switcher';

describe('DashboardSwitcher', () => {
  let component: DashboardSwitcher;
  let fixture: ComponentFixture<DashboardSwitcher>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardSwitcher],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardSwitcher);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
