import { atom } from 'recoil';

export const themesState = atom<string>({
    key: 'themeState',
    default: 'dark',
});
