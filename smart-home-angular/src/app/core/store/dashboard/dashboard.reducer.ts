import { createReducer, on } from '@ngrx/store';
import * as dashboardActions from './dashboard.actions';
import { CardI, DashboardI, TabI } from '../../models/dashboard.model';

export interface DashboardState {
  dashboard: DashboardI;
  selectedTabId: string;
}

const initialState: DashboardState = {
  dashboard: {
    id: '',
    title: '',
    icon: '',
    tabs: [],
  },
  selectedTabId: '',
};

export const dashboardReducer = createReducer(
  initialState,
  on(dashboardActions.copyDashboard, (state, { info, dashboardTabs }) => ({
    ...state,
    dashboard: {
      ...info,
      tabs: structuredClone(dashboardTabs),
    },
  })),
  on(dashboardActions.saveDashboard, (state) => {
    return {
      ...state,
      dashboard: state.dashboard,
    };
  }),
  on(dashboardActions.setCurrentTabId, (state, { tabId }) => {
    return {
      ...state,
      dashboard: state.dashboard,
      selectedTabId: tabId,
    };
  }),
  on(dashboardActions.updateTabTitle, (state, { tabId, newTitle }) => ({
    ...state,
    dashboard: {
      ...state.dashboard,
      tabs: state.dashboard.tabs.map((tab: TabI) => {
        if (tab.id === tabId) {
          return { ...tab, title: newTitle };
        }
        return tab;
      }),
    },
  })),
  on(dashboardActions.addTab, (state, { title }) => {
    const newTab = {
      id: title.toLowerCase().trim().replace(' ', '-'),
      title: title,
      cards: [],
    };
    return {
      ...state,
      dashboard: {
        ...state.dashboard,
        tabs: [...state.dashboard.tabs, newTab],
      },
      selectedTabId: newTab.id,
    };
  }),
  on(dashboardActions.removeTab, (state, { tabId }) => ({
    ...state,
    dashboard: {
      ...state.dashboard,
      tabs: state.dashboard.tabs.filter((tab: TabI) => tab.id !== tabId),
    },
  })),
  on(dashboardActions.increaseTabOrder, (state, { tabId }) => {
    const tabs = state.dashboard.tabs;
    const index = state.dashboard.tabs.findIndex((tab) => tab.id === tabId);
    if (index === tabs.length - 1) {
      return state;
    }
    const currentTab = state.dashboard.tabs[index];
    const newTabs = state.dashboard.tabs.filter((tab) => tab.id !== tabId);
    newTabs.splice(index + 1, 0, currentTab);

    return {
      ...state,
      dashboard: {
        ...state.dashboard,
        tabs: newTabs,
      },
    };
  }),
  on(dashboardActions.decreaseTabOrder, (state, { tabId }) => {
    const index = state.dashboard.tabs.findIndex((tab) => tab.id === tabId);
    if (index === 0) {
      return state;
    }
    const currentTab = state.dashboard.tabs[index];
    const newTabs = state.dashboard.tabs.filter((tab) => tab.id !== tabId);
    newTabs.splice(index - 1, 0, currentTab);

    return {
      ...state,
      dashboard: {
        ...state.dashboard,
        tabs: newTabs,
      },
    };
  }),
  on(dashboardActions.addCard, (state, { tabId, layout }) => {
    const newEntityCard: CardI = {
      id: crypto.randomUUID(),
      title: '',
      layout: layout,
      items: [],
    };
    return {
      ...state,
      dashboard: {
        ...state.dashboard,
        tabs: state.dashboard.tabs.map((tab) => {
          return tab.id === tabId ? { ...tab, cards: [...tab.cards, newEntityCard] } : tab;
        }),
      },
    };
  }),
  on(dashboardActions.increaseCardOrder, (state, { cardId }) => {
    const tabs = state.dashboard.tabs;
    const tab = tabs.find((tab) => tab.id === state.selectedTabId);
    const cards = [...(tab?.cards ?? [])];
    const cardIndex = cards.findIndex((card) => card.id === cardId);
    if (cardIndex >= cards.length - 1) return state;
    const currentCard = cards[cardIndex];
    const newCards = cards.filter((card) => card.id !== cardId);
    newCards.splice(cardIndex + 1, 0, currentCard);

    return {
      ...state,
      dashboard: {
        ...state.dashboard,
        tabs: state.dashboard.tabs.map((tab) =>
          tab.id === state.selectedTabId ? { ...tab, cards: [...newCards] } : tab,
        ),
      },
    };
  }),
  on(dashboardActions.decreaseCardOrder, (state, { cardId }) => {
    const tabs = state.dashboard.tabs;
    const tab = tabs.find((tab) => tab.id === state.selectedTabId);
    const cards = [...(tab?.cards ?? [])];
    const cardIndex = cards.findIndex((card) => card.id === cardId);
    if (cardIndex === 0) return state;
    const currentCard = cards[cardIndex];
    const newCards = cards.filter((card) => card.id !== cardId);
    newCards.splice(cardIndex - 1, 0, currentCard);

    return {
      ...state,
      dashboard: {
        ...state.dashboard,
        tabs: state.dashboard.tabs.map((tab) =>
          tab.id === state.selectedTabId ? { ...tab, cards: [...newCards] } : tab,
        ),
      },
    };
  }),

  on(dashboardActions.removeItemFromCard, (state, { tabId, cardId, itemId }) => {
    return {
      ...state,
      dashboard: {
        ...state.dashboard,
        tabs: state.dashboard.tabs.map((tab) =>
          tab.id === tabId
            ? {
                ...tab,
                cards: tab.cards.map((card) =>
                  card.id === cardId
                    ? { ...card, items: card.items.filter((item) => item.label !== itemId) }
                    : card,
                ),
              }
            : tab,
        ),
      },
    };
  }),
  on(dashboardActions.saveUpdatedCardItem, (state, { tabId, cardId, cardTitle, entities }) => ({
    ...state,
    dashboard: {
      ...state.dashboard,
      tabs: state.dashboard.tabs.map((tab) => {
        if (tab.id !== tabId) return tab;
        return {
          ...tab,
          cards: tab.cards.map((card) => {
            if (card.id !== cardId) return card;
            return {
              ...card,
              title: cardTitle,
              items: entities,
            };
          }),
        };
      }),
    },
  })),
  on(dashboardActions.toggleItemSwitcher, (state, { tabId, cardId, deviceId, deviceState }) => ({
    ...state,
    dashboard: {
      ...state.dashboard,
      tabs: state.dashboard.tabs.map((tab) => {
        if (tab.id !== tabId) return tab;
        return {
          ...tab,
          cards: tab.cards.map((card) => {
            if (card.id !== cardId) return card;
            return {
              ...card,
              items: card.items.map((item) => {
                if (item.id !== deviceId) return item;
                return { ...item, state: deviceState };
              }),
            };
          }),
        };
      }),
    },
  })),
  on(dashboardActions.addItemToCard, (state, { tabId, cardId, item }) => {
    return {
      ...state,
      dashboard: {
        ...state.dashboard,
        tabs: state.dashboard.tabs.map((tab) => {
          if (tab.id !== tabId) return tab;
          return {
            ...tab,
            cards: tab.cards.map((card) => {
              if (card.id !== cardId) return card;
              return {
                ...card,
                items: [...card.items, item],
              };
            }),
          };
        }),
      },
    };
  }),
);
