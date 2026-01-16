import { Component, inject } from '@angular/core';
import { Card } from '../../card/card';
import { CardI } from '../../../../../../core/models/dashboard.model';
import { AppState } from '../../../../../../state/app-state';
import { Store } from '@ngrx/store';
import { selectTabId } from '../../../../../../core/store/dashboard/dashboard.selectors';
import { addCard } from '../../../../../../core/store/dashboard/dashboard.actions';

@Component({
  selector: 'smart-home-add-card-modal',
  standalone: true,
  imports: [Card],
  templateUrl: './add-card-modal.html',
  styleUrls: ['./add-card-modal.scss'],
})

export class AddCardModal {
  appState = inject(AppState);
  store = inject(Store)
  cards: CardI[] = [
     {
          "id": "indoor-rooms",
          "title": "Entities",
          "layout": "verticalLayout",
          "items": [
            {
              "type": "sensor",
              "icon": "co2",
              "label": "CO2 Sensor",
              "value": {
                "amount": 520,
                "unit": "ppm"
              }
            },
            {
              "type": "sensor",
              "icon": "water_drop",
              "label": "Humidity",
              "value": {
                "amount": 45,
                "unit": "%"
              }
            }
          ]
        },
          {
          "id": "bathroom-motion",
          "title": "Entity",
          "layout": "singleDevice",
          "items": [
            {
              "type": "sensor",
              "icon": "motion_photos_on",
              "label": "Motion Sensor",
              "value": {
                "amount": 1,
                "unit": "detected"
              }
            }
          ]
        },
    {
          "id": "balcony-weather",
          "title": "Glance",
          "layout": "horizontalLayout",
          "items": [
            {
              "type": "sensor",
              "icon": "thermostat",
              "label": "Temperature",
              "value": {
                "amount": 18.5,
                "unit": "\u00b0C"
              }
            },
            {
              "type": "sensor",
              "icon": "water_drop",
              "label": "Humidity",
              "value": {
                "amount": 72,
                "unit": "%"
              }
            },
            {
              "type": "sensor",
              "icon": "cloud",
              "label": "Weather",
              "value": {
                "amount": 1,
                "unit": "clear"
              }
            }
          ]
        }]


    closeModal(){
      this.appState.isAddCardModalOpen.set(false)
    }

    addCard(layout: string){
      console.log(layout)
      const tabId = this.store.selectSignal(selectTabId)
      this.store.dispatch(addCard({tabId: tabId(), layout: layout}))
      this.appState.isAddCardModalOpen.set(false)
    }

}
