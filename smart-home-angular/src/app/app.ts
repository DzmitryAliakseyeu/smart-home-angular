import { Component, HostListener, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Layout } from "./core/layout/layout";
import { windowWidthSignal } from './state/app.state';
import { updateWindowWidthSignal } from './state/app.store';

@Component({
  selector: 'app-root',
  imports: [ Layout],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('smart-home-angular');

  windowWidth = windowWidthSignal;

  @HostListener('window: resize')
  onResize(){
    updateWindowWidthSignal(window.innerWidth)
    // updateIsModalViewport()
  }
}
