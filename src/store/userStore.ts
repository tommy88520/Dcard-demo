import { create } from 'zustand';
import axios from 'axios';
import { devtools, persist } from 'zustand/middleware';
import { UserDataState, UserRepoState, RepoAllIssueState } from './state';
// import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { useLoginStore } from '~/store';

const userRequest = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_BASE_URL,
  headers: {
    Accept: 'application/vnd.github+json',
  },
});
export const useUserStore = create<UserDataState>()(
  devtools(
    persist(
      (set) => ({
        userData: {
          id: '',
          username: '',
          photos: [],
          access_token: '',
          email: [],
          token: '',
        },
        getUserData: async () => {
          const token = JSON.parse(localStorage.getItem('dcard-login') || '{}');
          await userRequest
            .get('user/getUserData', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              set(() => ({ userData: res.data }));
              useLoginStore.getState().toggleLogin();
            })
            .catch((error) => {
              console.log('未登入or登入失敗');
              useLoginStore.getState().toggleLogOut();
            });
        },
      }),
      {
        name: 'user-login',
      },
    ),
  ),
);
export const useRepoStore = create<UserRepoState>()(
  devtools(
    persist(
      (set) => ({
        userRepo: [],
        getUserRepo: async () => {
          const token = JSON.parse(localStorage.getItem('dcard-login') || '{}');
          await userRequest
            .get('user/getRepos', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              set((state) => ({ userRepo: (state.userRepo = res.data) }));
            })
            .catch((error) => {
              console.log('未登入or登入失敗');
            });
        },
      }),
      {
        name: 'user-repo',
      },
    ),
  ),
);
export const useAllIssueStore = create<RepoAllIssueState>()(
  devtools(
    persist(
      (set, get) => ({
        repoAllIssues: [
          {
            title: '',
            number: 0,
            label: {
              name: '',
              description: '',
            },
            body: '',
            created_at: new Date(),
          },
        ],
        getRepoAllIssues: async (query) => {
          const token = JSON.parse(localStorage.getItem('dcard-login') || '{}');
          await userRequest
            .get('user/getAllIssues', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              params: query,
            })
            .then((res) => {
              console.log('dddfffgad');

              set(() => ({ repoAllIssues: res.data }));
            })
            .catch((error) => {
              console.log('未登入or登入失敗');
            });
        },
      }),
      {
        name: 'user-AllIssues',
      },
    ),
  ),
);
