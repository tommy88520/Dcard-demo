import { create } from 'zustand';
import axios from 'axios';
import { devtools, persist } from 'zustand/middleware';
import { UserDataState, UserRepoState, RepoAllIssueState } from './state';
import Swal from 'sweetalert2/dist/sweetalert2.js';
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
              console.log(res.data);
              useLoginStore.getState().toggleLogin();
            })
            .catch((error) => {
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
          const result = await userRequest
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
              return res.data;
            })
            .catch((error) => {
              console.log('未登入or登入失敗');
            });
          return result;
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
      repoAllIssues: [],
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
      dataStatus: {
        loading: true,
        hasNextPage: false,
      },
      setLoading: () => set((state) => ({ dataStatus: { ...state.dataStatus, loading: true } })),
      getRepoAllIssues: async (query, type) => {
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
            if (type === 'search') {
              set(() => ({ repoAllIssues: res.data }));
            } else {
              set((state) => ({ repoAllIssues: [...state.repoAllIssues, ...res.data] }));
            }
            set(() => ({
              dataStatus: { loading: false, hasNextPage: Boolean(res.data.length) },
            }));
            set((state) => ({ dataStatus: { ...state.dataStatus, loading: false } }));
            console.log(get().repoAllIssues);
          })
          .catch((error) => {
            console.log('未登入or登入失敗');
          });
      },
      setRepoAllIssues: async (data) => {
        set(() => ({ repoAllIssues: data }));
      },
    }),
    //   {
    //     name: 'user-AllIssues',
    //   },
    // ),
  ),
);
export { useAllIssueStore, useUserStore, useRepoStore };
