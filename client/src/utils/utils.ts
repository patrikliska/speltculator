import { atom, RecoilState } from 'recoil';

export const localStorageEffect =
  <T>(storageKey: string) =>
  ({ onSet, setSelf }: { onSet: (callback: (newValue: T) => void) => void; setSelf: (newValue: T) => void }): void => {
    const savedValue = localStorage.getItem(storageKey);

    if (savedValue !== null) setSelf(JSON.parse(savedValue));

    onSet((newValue: T) => {
      if (newValue == null) {
        localStorage.removeItem(storageKey);
      } else {
        localStorage.setItem(storageKey, JSON.stringify(newValue));
      }
    });
  };

export function createLocalStoredAtom<T>(key: string, defaultValue: T): RecoilState<T> {
  return atom<T>({
    default: defaultValue,
    effects: [localStorageEffect(key)],
    key,
  });
}
