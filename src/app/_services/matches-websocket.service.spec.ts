import { TestBed } from '@angular/core/testing';

import { MatchesWebSocketService } from './matches-websocket.service';

describe('MatchWebsocketService', () => {
  let service: MatchesWebSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatchesWebSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
