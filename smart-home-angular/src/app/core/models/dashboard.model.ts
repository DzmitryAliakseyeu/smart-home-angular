export interface DashboardI {
  tabs: TabI[];
}

export interface TabI {
  id: string;
  title: string;
  cards: CardI[];
}

export interface CardI {
  id: string;
  title: string;
  layout: string;
  items: CardItemI[];
}

export interface CardItemI {
  type: 'sensor' | 'device';
  icon: string;
  label: string;
  value?: CardItemValueI;
  state?: boolean;
}

interface CardItemValueI {
  amount: number;
  unit: string;
}
