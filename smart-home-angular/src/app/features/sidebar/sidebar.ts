import { Component } from '@angular/core';
import { Header } from './components/header/header';

@Component({
  selector: 'smart-home-sidebar',
  standalone: true,
  imports: [Header],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
})
export class Sidebar {

}
