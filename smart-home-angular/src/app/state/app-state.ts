import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { CardI, CardItemI, TabI } from '../core/models/dashboard.model';
import { MockDataService } from '../core/services/managment-mock-data/managment-mock-data';

interface AppStateObjI {
    width: number,
    dashboardId: string,
    tabs: TabI[],
    cards: CardI[],
    items: CardItemI[]
  }

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

  clickedCardId = signal('')

  private cardsTabId: string | null = null;
  tabs: TabI[] | [] = [];
  cards: CardI[] | [] = [];
  // items: CardItemI[] | [];

  // appStateObj: AppStateObjI = {
  //   width: this.windowWidthSignal(),
  //   dashboardId: this.selectedDashboardSwitcherIdSignal(),
  //   tabs: this.tabs,
  //   cards: this.cards,
  //   items: this.items

  // }

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
        this.setCurrentTabsSignal(this.tabs);

      } else {
        this.tabs = [];
        this.setCurrentTabsSignal([]);
        this.setNewSelectedTab('')
      }

    })


    //for cards
    effect(()=> {
      console.log('click')
      const dashboard = this.selectedDashboardSwitcherIdSignal();
      const tabId = this.selectedTabIdSignal();
       if(this.selectedDashboardSwitcherIdSignal() !== 'dsh-overview'){
          this.cards = [];
          this.setCurrentCardsListSignal(this.cards);
          return
      }


      if(!this.currentCardsListSignal().length || this.cardsTabId !== tabId){
        this.cards = this.data.getCardsList(this.selectedTabIdSignal());
        this.setCurrentCardsListSignal(this.cards);
        this.cardsTabId = tabId
      }
    })

    //for items
    effect(()=> {
      console.log(this.clickedCardId())
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

  loadCards(){
    if (this.selectedDashboardSwitcherIdSignal() !== 'dsh-overview') {
      this.currentCardsListSignal.set([]);
    return;
    }
    this.cards = this.data.getCardsList(this.selectedTabIdSignal());
    this.currentCardsListSignal.set(this.cards);
  }

  setCurrentCardsListSignal(cards: CardI[]){
    this.currentCardsListSignal.set(cards)
  }

  toggleItemSwitcher(cardId: string, itemId: string){


  const updatedCards = this.currentCardsListSignal().map(card => {
    if (card.id !== cardId) return card;

    return {
      ...card,
      items: card.items.map(item => {
        if (item.label === itemId) {
          return {
            ...item,
            state: !item.state
          };
        }
        return item;
      })
    };
  });

  this.currentCardsListSignal.set(updatedCards);

  }
}
