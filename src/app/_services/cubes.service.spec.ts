import { TestBed } from '@angular/core/testing';

import { CubesService } from './cubes.service';

describe('CubeService', () => {
  let service: CubesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CubesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
