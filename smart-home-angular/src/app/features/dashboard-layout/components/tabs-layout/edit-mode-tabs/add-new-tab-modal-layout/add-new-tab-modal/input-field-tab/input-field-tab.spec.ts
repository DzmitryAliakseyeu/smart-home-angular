import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFieldTab } from './input-field-tab';

describe('InputField', () => {
  let component: InputFieldTab;
  let fixture: ComponentFixture<InputFieldTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputFieldTab],
    }).compileComponents();

    fixture = TestBed.createComponent(InputFieldTab);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
