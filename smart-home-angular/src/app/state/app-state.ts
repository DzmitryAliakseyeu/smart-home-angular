import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { CardI, CardItemI, DashboardI, DashboardInfo, TabI } from '../core/models/dashboard.model';
import { MockDataService } from '../core/services/managment-mock-data/managment-mock-data';
import { Dashboards } from '../core/services/dashboards/dashboards';
import { Router } from '@angular/router';

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
  managerDashboards = inject(Dashboards);
  router = inject(Router);

  windowWidthSignal = signal(window.innerWidth);
  isMobileViewportSignal = computed(() => this.windowWidthSignal() <= 768);

  dashboards = signal<DashboardI[] | []>([]);

  selectedDashboardSwitcherIdSignal = signal('');
  isSelectedDashboardChanged = signal(false);
  isChangedDashboard = signal(false);
  isAddNewDashboard = signal(false)

  currentTabsSignal = signal<TabI[] | []>([]);
  selectedTabIdSignal = signal('');
  isChangedTab = signal(false);

  currentCardsListSignal = signal<CardI[]>([]);

  clickedCardId = signal('');

  isMobileSidebarOpen = signal(false);

  isUserAuth = signal(false);

  isAddDashboardModalOpen = signal(false);

  isDeleteDashboard = signal(false)

  private cardsTabId: string | null = null;
  tabs: TabI[] | [] = [];
  cards: CardI[] | [] = [];

  constructor() {
    //for window width
    effect(() => {
      this.isMobileViewportSignal = computed(() => this.windowWidthSignal() <= 768);
    });

    //for dashboards
    effect(()=> {
      if(this.isAddNewDashboard() || this.isDeleteDashboard()){
        this.managerDashboards.getDashboards().subscribe({
          next: (dashboards)=> {
            this.dashboards.set(dashboards)
          },
          error: (res) =>{
            console.log(res)
          }
        })
      }
    })

    //for dashboard switcher
    effect(() => {
      if (this.isChangedDashboard()) {
        const selectedDashboardSwitcherId = this.selectedDashboardSwitcherIdSignal();
        this.managerDashboards.getDashboardTabs(selectedDashboardSwitcherId).subscribe({
          next: (res) => {
            if(res.tabs.length > 0){
              this.currentTabsSignal.set(res.tabs);
              const firstTabId = this.currentTabsSignal()[0].id;
              this.selectedTabIdSignal.set(firstTabId);
              const currentCards = this.currentTabsSignal()[0].cards;
              this.currentCardsListSignal.set(currentCards);
              this.router.navigate(['/dashboard', selectedDashboardSwitcherId, firstTabId]);
               this.isChangedDashboard.set(false);
               return
            } else {
              this.selectedTabIdSignal.set('');
              this.currentTabsSignal.set([]);
              this.currentCardsListSignal.set([]);
              this.router.navigate(['/dashboard', selectedDashboardSwitcherId]);
              this.isChangedDashboard.set(false);
              return
            }


          },
          error: (res) => {
            console.error(res);

          },
        });
      }
    });

    //for dashboard tabs
    effect(() => {
      if (this.isChangedTab()) {
        const selectedDashboardSwitcherId = this.selectedDashboardSwitcherIdSignal();
        const selectedTabId = this.selectedTabIdSignal();
        const currentTabs: TabI[] = this.currentTabsSignal();
        const currentTab: TabI[] = currentTabs.filter((tab: TabI) => tab.id === selectedTabId);
        const currentCardsList: CardI[] = currentTab[0].cards;
        this.currentCardsListSignal.set(currentCardsList);
        this.router.navigate(['/dashboard', selectedDashboardSwitcherId, selectedTabId]);
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

  getCurrentDashboardData(){
    const dashboards = this.dashboards();
    const currentDashboardId =  this.selectedDashboardSwitcherIdSignal();
    return dashboards.filter((dashboard: DashboardInfo)=> dashboard.id === currentDashboardId)
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
    if (!this.isMobileViewportSignal()) {
      return;
    }

    this.isMobileSidebarOpen.set(!this.isMobileSidebarOpen());
  }
}
