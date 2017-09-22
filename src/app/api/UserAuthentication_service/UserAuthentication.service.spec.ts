import { TestBed, inject } from '@angular/core/testing';

import { UserAuthenticationService } from './UserAuthentication.service';

describe('LoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserAuthenticationService]
    });
  });

  it('should be created', inject([UserAuthenticationService], (service: UserAuthenticationService) => {
    expect(service).toBeTruthy();
  }));
});
