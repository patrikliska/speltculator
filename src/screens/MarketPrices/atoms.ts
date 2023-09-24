import { atom } from 'recoil';

import { qualities } from './constants';
import { QualityName } from './types';

export const itemQualityAtom = atom<QualityName>({
  default: qualities[0],
  key: 'ItemQuality',
});

export const itemTiersAtom = atom<number[]>({
  default: [0],
  key: 'ItemTiers',
});
