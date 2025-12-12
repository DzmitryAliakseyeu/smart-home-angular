import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { AppState } from '../../../../../state/app-state';
import { CardI, CardItemI } from '../../../../../core/models/dashboard.model';
import { Device } from "./device/device";
import { Sensor } from "./sensor/sensor";

@Component({
  selector: 'smart-home-card',
  standalone: true,
  imports: [Device, Sensor],
  templateUrl: './card.html',
  styleUrls: ['./card.scss'],

})
export class Card {
  appState = inject(AppState);
  card = input.required<CardI>();
  items!: CardItemI[];
  layout =  input('')
  isCardHasFewDevices = signal<boolean>(false);
  isMoreOneDevicesActive = signal<boolean>(false);

  constructor(){
    effect(()=> {
      const activeItems = this.checkEachItemSwitcherState();
      this.isMoreOneDevicesActive.set(activeItems.length > 0);
    })
  }

  ngOnInit() {
    this.items = this.card().items;
    const devices = this.items.filter((item) => item.type === 'device')
    this.isCardHasFewDevices.set(devices.length > 1);

    const activeDevices = devices.filter((device) => device.state);
    this.isMoreOneDevicesActive.set(activeDevices.length > 0)
  }

  checkEachItemSwitcherState(){
    const card = this.appState.currentCardsListSignal().find(card => card.id === this.card().id)

     return card?.items.filter(item => item.state) ?? [];
  }

  toggleAllItemSwitchers(){
    this.isMoreOneDevicesActive.set(!this.isMoreOneDevicesActive());
    const updatedCards = this.appState.currentCardsListSignal().map(card => {

      return {
        ...card,
        items: card.items.map(item => {

          if(item.type === 'device'){
            return {
              ...item,
              state: this.isMoreOneDevicesActive()
            };
          }

          return {...item};
        })
      };
    });

    this.appState.currentCardsListSignal.set(updatedCards);
  }
}
