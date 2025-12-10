
import { CardI, TabI } from "../core/models/dashboard.model";
import { currentCardsListSignal, currentTabsSignal, windowWidthSignal } from "./app.state";

export function updateWindowWidthSignal(width: number){
  windowWidthSignal.set(width)
}

export function setCurrentTabsSignal(arr: TabI[] | []){
  currentTabsSignal.set(arr)
}

export function setCurrentCardsListSignal(cards: CardI[]){
  currentCardsListSignal.set(cards)
}


