import { Component } from '@angular/core';
import { Sidebar } from "../../features/sidebar/sidebar";
import { isMobileViewportSignal } from '../../state/app.state';

@Component({
  selector: 'smart-home-layout',
  standalone: true,
  imports: [Sidebar],
  templateUrl: './layout.html',
  styleUrls: ['./layout.scss'],
})
export class Layout {

  isMobileViewport = isMobileViewportSignal
}
