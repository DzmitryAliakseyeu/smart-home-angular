import { computed, signal } from "@angular/core";
import { TabI } from "../core/models/dashboard.model";

export const windowWidthSignal = signal(window.innerWidth);
export const isMobileViewportSignal = computed(()=> (windowWidthSignal() <= 768));

export const currentTabs = signal<TabI[] | []>([]);
export const selectedTabId = signal('')
