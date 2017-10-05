import { TestBed, inject } from '@angular/core/testing';

import { ChangeScaleService } from './ChangeScale.service';

describe('HeaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChangeScaleService]
    });
  });

  it('should be created', inject([ChangeScaleService], (service: ChangeScaleService) => {
    expect(service).toBeTruthy();
  }));
});
