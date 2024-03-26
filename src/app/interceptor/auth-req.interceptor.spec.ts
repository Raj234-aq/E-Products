import { TestBed } from '@angular/core/testing';

import { AuthReqInterceptor } from './auth-req.interceptor';

describe('AuthReqInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthReqInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthReqInterceptor = TestBed.inject(AuthReqInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
