import { create } from 'zustand';
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { devtools, persist } from 'zustand/middleware';
import { IssueSortState, GetIssueDetail, CreateIssue, UpdateIssue } from './state';
import { useAllIssueStore } from './userStore';
const userRequest = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_BASE_URL,
  headers: {
    Accept: 'application/vnd.github+json',
  },
});
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
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
          const { getRepoAllIssues, getIssueQuery } = useAllIssueStore.getState();
          Toast.fire({
            icon: 'success',
            title: 'Signed in successfully',
          }).then((result) => {
            getRepoAllIssues(getIssueQuery);
          });
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
          const { getRepoAllIssues, getIssueQuery } = useAllIssueStore.getState();

          Toast.fire({
            icon: 'success',
            title: 'Signed in successfully',
          }).then((result) => {
            getRepoAllIssues(getIssueQuery);
          });
        })
        .catch((error) => {
          console.log('未登入or登入失敗');
        });
    },
  })),
);
