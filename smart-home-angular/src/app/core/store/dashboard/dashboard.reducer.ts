import { createReducer, on } from '@ngrx/store';
import * as dashboardActions from './dashboard.actions';
import { CardI, DashboardI, TabI } from '../../models/dashboard.model';

export interface DashboardState {
  dashboard: DashboardI;
  selectedTabId: string
}

const initialState: DashboardState = {
  dashboard: {
    id: '',
    title: '',
    icon: '',
    tabs: [],
  },
  selectedTabId: ''
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
  on(dashboardActions.setCurrentTabId, (state, {tabId}) => {
    return {
      ...state,
      dashboard: state.dashboard,
      selectedTabId: tabId
  }
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
      selectedTabId: newTab.id
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
  on(dashboardActions.addCard, (state, {tabId, layout})=>{
    const newEntityCard: CardI = {
      id: tabId,
      title: '',
      layout: layout,
      items: []
    }
    return {
      ...state,
      dashboard: {
        ...state.dashboard,
        tabs: state.dashboard.tabs.map((tab) => {
          return tab.id === tabId ? {...tab, cards: [...tab.cards, newEntityCard]} : tab
        })

      }
    }
  })
);
