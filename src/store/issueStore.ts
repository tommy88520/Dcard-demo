import { create } from 'zustand';
import axios from 'axios';
import { devtools, persist } from 'zustand/middleware';
import { IssueSortState, GetIssueDetail, CreateIssue, UpdateIssue } from './state';
import { useAllIssueStore } from './userStore';
const userRequest = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_BASE_URL,
  headers: {
    Accept: 'application/vnd.github+json',
  },
});

export const useGetIssueDetailStore = create<GetIssueDetail>()(
  devtools(
    persist(
      (set, get) => ({
        issueDetail: {
          title: '',
          number: 1,
          label: {
            name: '',
            description: '',
          },
          body: '',
          created_at: new Date(),
        },
        getIssueDetail: async (query) => {
          const token = JSON.parse(localStorage.getItem('dcard-login') || '{}');
          await userRequest
            .get('user/getIssue', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              params: query,
            })
            .then((res) => {
              set(() => ({ issueDetail: res.data }));
            })
            .catch((error) => {
              console.log('未登入or登入失敗');
            });
        },
      }),
      {
        name: 'issue-detail',
      },
    ),
  ),
);

export const createIssueStore = create<CreateIssue>()(
  devtools((set, get) => ({
    messages: '',
    createIssue: async (query, name) => {
      const token = JSON.parse(localStorage.getItem('dcard-login') || '{}');
      await userRequest
        .post('user/createIssue', query, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          set(() => ({ messages: res.data }));
          const query = {
            repo: name,
            query: {
              state: 'open',
              labels: '',
              sort: 'created',
              direction: 'desc',
              per_page: 10,
              page: 1,
            },
          };
          useAllIssueStore.getState().getRepoAllIssues(query);
        })
        .catch((error) => {
          console.log('未登入or登入失敗');
        });
    },
  })),
);

export const updateIssueStore = create<UpdateIssue>()(
  devtools((set) => ({
    updateMessages: '',
    updateIssue: async (query, name) => {
      const token = JSON.parse(localStorage.getItem('dcard-login') || '{}');
      await userRequest
        .patch('user/updateIssue', query, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          set(() => ({ updateMessages: res.data }));
          const query = {
            repo: name,
            query: {
              state: 'open',
              labels: '',
              sort: 'created',
              direction: 'desc',
              per_page: 10,
              page: 1,
            },
          };
          useAllIssueStore.getState().getRepoAllIssues(query);
        })
        .catch((error) => {
          console.log('未登入or登入失敗');
        });
    },
  })),
);
