// import { createReducer, on } from '@ngrx/store';
// import * as TabActions from './tabs.actions';
// import { TabI } from '../../models/dashboard.model';

// export interface TabState {
//   tab: TabI,
//   isEditTab: boolean;
// }

// export const initialState: TabState = {
//   tab: {
//      id: '',
//     title: '',
//     cards: []
//   },
//   isEditTab: false,
// };

// export const tabReducer = createReducer(
//   initialState,
//   on(TabActions.enterEditModeTabs, (state) => ({
//     ...state,
//     isEditTab: true,
//   })),
//   on(TabActions.exitEditModeTabs, (state) => ({
//     ...state,
//     isEditTab: false,
//   })),
//   on(TabActions.addNewTab, (state)=> ({
//     ...state,

//   })),
//    on(TabActions.saveUpdatedTab, (state, {updatedTab})=> ({
//     ...state,
//     tab: updatedTab
//   }))
// );
