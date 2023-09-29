import { atom } from 'recoil';

import { qualities } from './constants';
import { QualityName, SelectedItem, ItemTier } from './types';

export const itemQualityAtom = atom<QualityName>({
  default: qualities[0],
  key: 'ItemQuality',
});

export const itemTiersAtom = atom<ItemTier[]>({
  default: [0, 1, 2, 3, 4],
  key: 'ItemTier',
});

export const selectedMarketItemsAtom = atom<SelectedItem[]>({
  default: [],
  key: 'SelectedMarketItems',
});
