import { Component } from '@angular/core';
import { Header } from './components/header/header';
import { Footer } from "./components/footer/footer";

@Component({
  selector: 'smart-home-sidebar',
  standalone: true,
  imports: [Header, Footer],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
})
export class Sidebar {

}
