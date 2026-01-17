import { Component, HostBinding, inject, input, Input } from '@angular/core';
import { CardI, CardItemI } from '../../../../../../core/models/dashboard.model';
import { AppState } from '../../../../../../state/app-state';
import { MatIconModule } from '@angular/material/icon';
import { DeviceHighlight } from '../../../../directives/device-highlight';
import { v4 as uuidv4 } from 'uuid';
import { Store } from '@ngrx/store';
import { isSelectEditModeOpen } from '../../../../../../core/store/edit-mode/edit-mode.selectors';
import { toggleItemSwitcher } from '../../../../../../core/store/dashboard/dashboard.actions';
import { selectCards } from '../../../../../../core/store/dashboard/dashboard.selectors';

@Component({
  selector: 'smart-home-device',
  standalone: true,
  imports: [MatIconModule, DeviceHighlight],
  templateUrl: './device.html',
  styleUrls: ['./device.scss'],
})
export class Device {
  appState = inject(AppState);
  item = input.required<CardItemI>();
  card = input.required<CardI>();
  store = inject(Store)
  isEditMode = this.store.selectSignal(isSelectEditModeOpen)

  private readonly generatedId = uuidv4();

  @HostBinding('attr.id')
  id = this.generatedId;

  toggleSwitcher(cardId: string, itemLabel: string){
    if(!this.isEditMode()){
      this.appState.toggleItemSwitcher(cardId, itemLabel)
    } else {
      const tabId = this.appState.selectedTabIdSignal();
      const cards = this.store.selectSignal(selectCards);
      const deviceId = this.item().id?.toString() ?? ''
      const currentCard = cards().find((card) => card.items.find((item)=> item.id === deviceId))
      const cardId = currentCard?.id ?? '';

      const deviceState = !(!!this.item()?.state);
      this.store.dispatch(toggleItemSwitcher({tabId, cardId, deviceId, deviceState}))
    }
  }
}
