import { TestBed } from '@angular/core/testing';

import { MatchWebsocketService } from './match-websocket.service';

describe('MatchWebsocketService', () => {
  let service: MatchWebsocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatchWebsocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
