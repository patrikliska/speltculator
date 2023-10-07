import { atom } from 'recoil';

import { createLocalStoredAtom } from '../../utils';

import { qualities } from './constants';
import { QualityName, SelectedItem, ItemTier, Item } from './types';

export const itemQualityAtom = atom<QualityName>({
  default: qualities[0],
  key: 'ItemQuality',
});

export const allowItemQualityAtom = atom<boolean>({
  default: false,
  key: 'AllowItemQuality',
});

export const itemTiersAtom = atom<ItemTier[]>({
  default: [0, 1, 2, 3, 4],
  key: 'ItemTier',
});

export const selectedMarketItemsAtom = createLocalStoredAtom<SelectedItem[]>('SelectedMarketItems', []);

export const selectedItemsOptionsAtom = createLocalStoredAtom<Item[]>('SelectedItemsOptions', []);
