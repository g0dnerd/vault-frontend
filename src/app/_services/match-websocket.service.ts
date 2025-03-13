import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

import { Match } from '../_types';

@Injectable({
  providedIn: 'root',
})
export class MatchWebSocketService {
  constructor(private webSocket: Socket) {}

  listenForMatchUpdates() {
    return this.webSocket.fromEvent<Match, any>('matchUpdated');
  }
}
