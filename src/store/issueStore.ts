import { create } from 'zustand';
import axios from 'axios';
import { devtools, persist } from 'zustand/middleware';
import { GetIssueDetail, CreateIssue, UpdateIssue, IssuePageNumber } from './state';
import { useAllIssueStore } from './userStore';
import { useLoginStore } from '~/store';

const userRequest = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_BASE_URL,
  headers: {
    Accept: 'application/vnd.github+json',
  },
});

const useGetIssueDetailStore = create<GetIssueDetail>()(
  devtools(
    persist(
      (set) => ({
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
              if (error.response.status == 401) {
                useLoginStore.getState().toggleLogOut();
                console.log('未登入or登入失敗');
              } else {
                location.href = '/notFound';
              }
            });
        },
      }),
      {
        name: 'issue-detail',
      },
    ),
  ),
);

const createIssueStore = create<CreateIssue>()(
  devtools((set) => ({
    messages: '',
    createIssue: async (query) => {
      const token = JSON.parse(localStorage.getItem('dcard-login') || '{}');
      await userRequest
        .post('user/createIssue', query, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          set(() => ({ messages: res.data }));
          const { getRepoAllIssues, getIssueQuery } = useAllIssueStore.getState();
          setTimeout(() => {
            getRepoAllIssues(
              {
                ...getIssueQuery,
                params: {
                  sort: 'created',
                  order: 'desc',
                  per_page: 10,
                  page: 1,
                },
                noCache: true,
              },
              'search',
            );
          }, 1000); //github api會延遲
          setIssuePageStore.getState().setIssuePageNumber(1);
        })
        .catch(() => {
          console.log('未登入or登入失敗');
        });
    },
  })),
);

const updateIssueStore = create<UpdateIssue>()(
  devtools((set) => ({
    updateMessages: '',
    updateIssue: async (query) => {
      const token = JSON.parse(localStorage.getItem('dcard-login') || '{}');
      await userRequest
        .patch('user/updateIssue', query, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          set(() => ({ updateMessages: res.data }));
          const { getRepoAllIssues, getIssueQuery } = useAllIssueStore.getState();
          setTimeout(() => {
            getRepoAllIssues(
              {
                ...getIssueQuery,
                params: {
                  sort: 'created',
                  order: 'desc',
                  per_page: 10,
                  page: 1,
                },
                noCache: true,
              },
              'search',
            );
          }, 1000); //github api會延遲
          setIssuePageStore.getState().setIssuePageNumber(1);
        })
        .catch(() => {
          console.log('未登入or登入失敗');
        });
    },
  })),
);

const setIssuePageStore = create<IssuePageNumber>()(
  devtools((set) => ({
    issuePageNumber: 1,
    setIssuePageNumber: (page) => {
      set(() => ({ issuePageNumber: page }));
    },
  })),
);

export { setIssuePageStore, updateIssueStore, createIssueStore, useGetIssueDetailStore };
