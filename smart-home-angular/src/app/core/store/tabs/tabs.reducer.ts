import { createReducer, on } from '@ngrx/store';
import * as TabActions from './tabs.actions';

export interface TabState {
  isEditTab: boolean;
}

export const initialState = {
  isEditTab: false,
};

export const tabReducer = createReducer(
  initialState,
  on(TabActions.enterEditModeTabs, (state) => ({
    ...state,
    isEditTab: true,
  })),
  on(TabActions.exitEditModeTabs, (state) => ({
    ...state,
    isEditTab: false,
  })),
);
