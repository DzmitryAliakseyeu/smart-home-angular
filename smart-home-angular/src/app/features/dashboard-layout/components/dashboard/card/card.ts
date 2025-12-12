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
  isCardHasFewDevices = signal<boolean>(false);
  isMoreOneDevicesActive = signal<boolean>(false);

  constructor(){
    effect(()=> {
      const cardsWithActiveItems = this.checkEachItemSwitcherState();
      if(cardsWithActiveItems.length === 0){
        this.isMoreOneDevicesActive.set(false)
      } else {
        this.isMoreOneDevicesActive.set(true)
      }
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
    const cardsWithActiveItems = this.appState.currentCardsListSignal().map(card => {
     return card.items.filter((item) => item.state === true)
    })

    return  cardsWithActiveItems.filter((card) => card.length > 0);
  }

  toggleAllItemSwitchers(){
    this.isMoreOneDevicesActive.set(!this.isMoreOneDevicesActive())
     const updatedCards = this.appState.currentCardsListSignal().map(card => {


      return {
        ...card,
        items: card.items.map(item => {

            return {
              ...item,
              state: this.isMoreOneDevicesActive()
            };


        })
      };
    });

    this.appState.currentCardsListSignal.set(updatedCards);
  }
}
