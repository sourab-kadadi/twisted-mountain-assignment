import { TestBed } from '@angular/core/testing';

import { HttpServerService } from './http-server.service';

xdescribe('HttpServerService', () => {
  let service: HttpServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
