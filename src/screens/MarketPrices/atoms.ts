import { atom } from 'recoil';

export const itemQualityAtom = atom<string>({
  default: '',
  key: 'ItemQuality',
});

export const itemTiersAtom = atom<number[]>({
  default: [0],
  key: 'ItemTiers',
});
