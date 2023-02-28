import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { LoginState, MenuState } from './state';
import { useUserStore } from './userStore';

const useLoginStore = create<LoginState>()(
  devtools(
    persist(
      (set) => ({
        login: false,
        toggleLogin: () => {
          set((state) => ({ login: (state.login = true) }));
        },
        toggleLogOut: () => {
          set((state) => ({ login: (state.login = false) }));
          localStorage.removeItem('dcard-login');
          localStorage.removeItem('login');
          useUserStore.getState().userData = {
            id: '',
            username: '',
            photos: [],
            access_token: '',
            email: [],
            token: '',
          };
        },
      }),
      { name: 'login' },
    ),
  ),
);

const useAnimationStore = create<MenuState>()(
  devtools((set, get) => ({
    menuState: {
      initial: false,
      clicked: false,
    },
    toggleMenu: (query) => {
      set(() => ({ menuState: query }));

      console.log(get().menuState);
    },
  })),
);

export { useAnimationStore, useLoginStore };
