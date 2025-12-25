import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { CardI, CardItemI, DashboardI, TabI } from '../core/models/dashboard.model';
import { MockDataService } from '../core/services/managment-mock-data/managment-mock-data';
import { Dashboards } from '../core/services/dashboards/dashboards';

interface AppStateObjI {
  width: number;
  dashboardId: string;
  tabs: TabI[];
  cards: CardI[];
  items: CardItemI[];
}

@Injectable({
  providedIn: 'root',
})
export class AppState {
  data = inject(MockDataService);
  managerDashboards = inject(Dashboards)

  windowWidthSignal = signal(window.innerWidth);
  isMobileViewportSignal = computed(() => this.windowWidthSignal() <= 768);

  dashboards = signal<DashboardI[] | []>([])

  selectedDashboardSwitcherIdSignal = signal('');
  isSelectedDashboardChanged = signal(false);
  isChangedDashboard = signal(false)

  currentTabsSignal = signal<TabI[] | []>([]);
  selectedTabIdSignal = signal('');
  isChangedTab =signal(false)

  currentCardsListSignal = signal<CardI[]>([]);

  clickedCardId = signal('');

  isMobileSidebarOpen = signal(false);

  isUserAuth = signal(false);

  private cardsTabId: string | null = null;
  tabs: TabI[] | [] = [];
  cards: CardI[] | [] = [];

  constructor() {
    //for window width
    effect(() => {
      this.isMobileViewportSignal = computed(() => this.windowWidthSignal() <= 768);
    });

    //for dashboard switcher
    effect(() => {
      if(this.isChangedDashboard()){
        const selectedDashboardSwitcherId = this.selectedDashboardSwitcherIdSignal();
          this.managerDashboards.getDashboardTabs(selectedDashboardSwitcherId).subscribe({
        next: (res)=> {
          this.currentTabsSignal.set(res.tabs);
          const firstTabId =   this.currentTabsSignal()[0].id
          this.selectedTabIdSignal.set(firstTabId);
          const currentCards = this.currentTabsSignal()[0].cards
          this.currentCardsListSignal.set(currentCards);
          console.log(res.tabs)
          this.isChangedDashboard.set(false)
        },
        error: (res)=>{
          console.log(res)
        }
        })
      }
    });

    //for dashboard tabs
    effect(() => {
      if(this.isChangedTab()){
        const selectedTabId = this.selectedTabIdSignal()
        const currentTabs: TabI[]= this.currentTabsSignal();
        const currentTab: TabI[] = currentTabs.filter((tab: TabI) => tab.id === selectedTabId);
        const currentCardsList: CardI[] = currentTab[0].cards
        this.currentCardsListSignal.set(currentCardsList);
        this.isChangedTab.set(false);
      }
    });

    //for cards
    // effect(() => {
    //   const tabId = this.selectedTabIdSignal();
    //   if (this.selectedDashboardSwitcherIdSignal() !== 'dsh-overview') {
    //     this.cards = [];
    //     this.setCurrentCardsListSignal(this.cards);
    //     return;
    //   }

    //   if (!this.currentCardsListSignal().length || this.cardsTabId !== tabId) {
    //     this.cards = this.data.getCardsList(this.selectedTabIdSignal());
    //     this.setCurrentCardsListSignal(this.cards);
    //     this.cardsTabId = tabId;
    //   }
    // });
  }

  updateWindowWidthSignal(width: number) {
    this.windowWidthSignal.set(width);
  }

  setNewSelectedDashboardSwitcherId(id: string) {
    this.selectedDashboardSwitcherIdSignal.set(id);
  }

  setCurrentTabsSignal(tabs: TabI[] | []) {
    this.currentTabsSignal.set(tabs);
  }

  setNewSelectedTabId(id: string) {
    this.selectedTabIdSignal.set(id);
  }

  setCurrentCardsListSignal(cards: CardI[]) {
    this.currentCardsListSignal.set(cards);
  }

  toggleItemSwitcher(cardId: string, itemId: string) {
    this.clickedCardId.set(cardId);

    const updatedCards = this.currentCardsListSignal().map((card) => {
      if (card.id !== cardId) return card;

      return {
        ...card,
        items: card.items.map((item) => {
          if (item.label === itemId) {
            return {
              ...item,
              state: !item.state,
            };
          }
          return item;
        }),
      };
    });

    this.currentCardsListSignal.set(updatedCards);
  }

  manageMobileSidebar() {
    if(!this.isMobileViewportSignal()){
      return
    }

    this.isMobileSidebarOpen.set(!this.isMobileSidebarOpen());
  }
}
