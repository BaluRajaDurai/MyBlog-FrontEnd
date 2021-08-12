import { TestBed } from '@angular/core/testing';

import { MyblogService } from './myblog.service';

describe('MyblogService', () => {
  let service: MyblogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyblogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
