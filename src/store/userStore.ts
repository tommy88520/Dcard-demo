import { create } from 'zustand';
import axios from 'axios';
import { devtools, persist } from 'zustand/middleware';
import { UserDataState, UserRepoState, RepoAllIssueState } from './state';
import { useLoginStore } from '~/store';
import { setIssuePageStore } from './issueStore';

const userRequest = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_BASE_URL || 'http://localhost:3333/',
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
            .catch(() => {
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
            .catch(() => {
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
  devtools((set, get) => ({
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
      noCache: true,
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
          if (type === 'search' || query.params.page === 1) {
            set(() => ({ repoAllIssues: res.data }));
            setIssuePageStore.getState().setIssuePageNumber(1);
          } else {
            set((state) => ({ repoAllIssues: [...state.repoAllIssues, ...res.data] }));
          }
          set(() => ({
            dataStatus: { loading: false, hasNextPage: Boolean(res.data.length) },
          }));
        })
        .catch((error) => {
          if (error.response.status == 401) {
            useLoginStore.getState().toggleLogOut();
            console.log('未登入or登入失敗');
          } else {
            location.href = '/notFound';
          }
        });
    },
    setRepoAllIssues: async (data) => {
      set(() => ({ repoAllIssues: data }));
    },
  })),
);
export { useAllIssueStore, useUserStore, useRepoStore };
