import { TestBed, inject } from '@angular/core/testing';

import { WeatherAPIService } from './WeatherAPI.service';

describe('DashboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeatherAPIService]
    });
  });

  it('should be created', inject([WeatherAPIService], (service: WeatherAPIService) => {
    expect(service).toBeTruthy();
  }));
});
