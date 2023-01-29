import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { LoginState } from './state';
import { useUserStore } from './userStore';

export const useLoginStore = create<LoginState>()(
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
