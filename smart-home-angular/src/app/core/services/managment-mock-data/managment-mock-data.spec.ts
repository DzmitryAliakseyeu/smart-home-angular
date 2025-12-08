import { TestBed } from '@angular/core/testing';
import { MockDataService } from './managment-mock-data';

describe('ManagmentMockData', () => {
  let service: MockDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
