export enum Quality {
  Normal = '1',
  Good = '2',
  Outstanding = '3',
  Excelent = '4',
  Masterpiece = '5',
}

export type QualityName = keyof typeof Quality;

export interface Item {
  name: string;
  label: string;
  enchantments: string[];
}

export type City = 'Bridgewatch' | 'Thetford' | 'Lymhurst' | 'Carleon' | 'Fort Sterling';

export interface ItemPriceInformation {
  buy_price_max: number;
  buy_price_max_date: string;
  buy_price_min: number;
  buy_price_min_date: string;
  city: City;
  item_id: string;
  quality: number;
  sell_price_max: number;
  sell_price_max_date: string;
  sell_price_min: number;
  sell_price_min_date: string;
}

export interface SelectedItem extends Item {
  prices: ItemPriceInformation[];
}
