import { TestBed } from '@angular/core/testing';

import { MockUsersService } from './mock-users.service';

describe('MockUsersService', () => {
  let service: MockUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
