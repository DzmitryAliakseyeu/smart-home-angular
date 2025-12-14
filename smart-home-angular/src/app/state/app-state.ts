import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { CardI, CardItemI, TabI } from '../core/models/dashboard.model';
import { MockDataService } from '../core/services/managment-mock-data/managment-mock-data';

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

  windowWidthSignal = signal(window.innerWidth);
  isMobileViewportSignal = computed(() => this.windowWidthSignal() <= 768);

  selectedDashboardSwitcherIdSignal = signal('');

  currentTabsSignal = signal<TabI[] | []>([]);
  selectedTabIdSignal = signal('');

  currentCardsListSignal = signal<CardI[]>([]);

  clickedCardId = signal('');

  isMobileSidebarOpen = signal(false);

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
      if (this.selectedDashboardSwitcherIdSignal() === '') {
        this.selectedDashboardSwitcherIdSignal.set('dsh-overview');
        return;
      }
    });

    //for dashboard tabs
    effect(() => {
      if (this.selectedDashboardSwitcherIdSignal() === 'dsh-overview') {
        this.tabs = this.data.getTabsMD();
        this.selectedTabIdSignal.set(this.tabs[0].id);
        this.setCurrentTabsSignal(this.tabs);
      } else {
        this.tabs = [];
        this.setCurrentTabsSignal([]);
        this.setNewSelectedTab('');
      }
    });

    //for cards
    effect(() => {
      const tabId = this.selectedTabIdSignal();
      if (this.selectedDashboardSwitcherIdSignal() !== 'dsh-overview') {
        this.cards = [];
        this.setCurrentCardsListSignal(this.cards);
        return;
      }

      if (!this.currentCardsListSignal().length || this.cardsTabId !== tabId) {
        this.cards = this.data.getCardsList(this.selectedTabIdSignal());
        this.setCurrentCardsListSignal(this.cards);
        this.cardsTabId = tabId;
      }
    });
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

  setNewSelectedTab(id: string) {
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
    if (this.isMobileViewportSignal() && !this.isMobileSidebarOpen()) {
      console.log(this.isMobileSidebarOpen());
      this.isMobileSidebarOpen.set(true);
      return;
    }

    if (this.isMobileViewportSignal() && this.isMobileSidebarOpen()) {
      this.isMobileSidebarOpen.set(false);
      console.log(this.isMobileSidebarOpen());
      return;
    }
  }
}
