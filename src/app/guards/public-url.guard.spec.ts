import { TestBed } from '@angular/core/testing';

import { PublicUrlGuard } from './public-url.guard';

describe('PublicUrlGuard', () => {
  let guard: PublicUrlGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PublicUrlGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
