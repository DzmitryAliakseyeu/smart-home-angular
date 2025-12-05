import { computed, signal } from "@angular/core";

export const windowWidthSignal = signal(window.innerWidth);
// export const isMobileViewportSignal = signal(windowWidthSignal() <= 768);

export const isMobileViewportSignal = computed(()=> (windowWidthSignal() <= 768));
