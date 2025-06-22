import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Navbar } from './navbar/navbar';

@Component({
  standalone: true,
  imports: [RouterOutlet, Navbar],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly title = 'vault-frontend';
}
