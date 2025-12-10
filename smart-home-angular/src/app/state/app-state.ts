import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { CardI, TabI } from '../core/models/dashboard.model';
import { MockDataService } from '../core/services/managment-mock-data/managment-mock-data';

@Injectable({
  providedIn: 'root',
})
export class AppState {
  data = inject(MockDataService);

  windowWidthSignal = signal(window.innerWidth);
  isMobileViewportSignal = computed(()=> (this.windowWidthSignal() <= 768));

  selectedDashboardSwitcherIdSignal = signal('');

  currentTabsSignal = signal<TabI[] | []>([]);
  selectedTabIdSignal = signal('');

  currentCardsListSignal = signal<CardI[]>([]);

  tabs: TabI[] | [] = [];
  cards: CardI[] | [] = []

  constructor(){

    //for window width
      effect(()=>{
        this.isMobileViewportSignal = computed(()=> (this.windowWidthSignal() <= 768));
      })

    //for dashboard switcher
    effect(()=>{
      if(this.selectedDashboardSwitcherIdSignal() === ''){
        this.selectedDashboardSwitcherIdSignal.set('dsh-overview');
        return
      }
    })

    //for dashboard tabs
    effect(()=>{
      if(this.selectedDashboardSwitcherIdSignal() === 'dsh-overview'){
        this.tabs = this.data.getTabsMD();
        this.selectedTabIdSignal.set(this.tabs[0].id)
        this.setCurrentTabsSignal(this.tabs)

      } else {
        this.tabs = [];
        this.setCurrentTabsSignal([]);
        this.setNewSelectedTab('')
      }
    })


    //for cards
    effect(()=> {
       if(this.selectedDashboardSwitcherIdSignal() !== 'dsh-overview'){
          this.cards = [];
          this.setCurrentCardsListSignal(this.cards);
          return
      }
      this.cards = this.data.getCardsList(this.selectedTabIdSignal());
      this.setCurrentCardsListSignal(this.cards);
      console.log(this.currentCardsListSignal())
    })
  }


  updateWindowWidthSignal(width: number){
    this.windowWidthSignal.set(width)
  }

  setNewSelectedDashboardSwitcherId(id:string){
    this.selectedDashboardSwitcherIdSignal.set(id)
  }

  setCurrentTabsSignal(tabs: TabI[] | []){
    this.currentTabsSignal.set(tabs)
  }

  setNewSelectedTab(id: string){
    this.selectedTabIdSignal.set(id)
  }

  setCurrentCardsListSignal(cards: CardI[]){
    this.currentCardsListSignal.set(cards)
  }



}
