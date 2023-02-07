import { create } from 'zustand';
import axios from 'axios';
import produce from 'immer';
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
const useUserStore = create<UserDataState>()(
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
const useRepoStore = create<UserRepoState>()(
  devtools(
    persist(
      (set) => ({
        userRepo: [],
        getUserRepo: async (page) => {
          const token = JSON.parse(localStorage.getItem('dcard-login') || '{}');
          await userRequest
            .get('user/getRepos', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              params: {
                page,
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
const useAllIssueStore = create<RepoAllIssueState>()(
  devtools(
    // persist(
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
      getIssueQuery: {
        repo: '',
        q: '',
        label: '',
        params: {
          sort: 'created',
          order: 'desc',
          per_page: 10,
          page: 1,
        },
      },
      getRepoAllIssues: async (query) => {
        const data = get().getIssueQuery;
        set(() => ({ getIssueQuery: { ...data, ...query } }));

        const token = JSON.parse(localStorage.getItem('dcard-login') || '{}');
        await userRequest
          .get('user/searchIssue', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: get().getIssueQuery,
          })
          .then((res) => {
            console.log(res.data);

            set(() => ({ repoAllIssues: res.data }));
          })
          .catch((error) => {
            console.log('未登入or登入失敗');
          });
      },
    }),
    //   {
    //     name: 'user-AllIssues',
    //   },
    // ),
  ),
);
export { useAllIssueStore, useUserStore, useRepoStore };
