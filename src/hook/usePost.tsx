import { useState, useEffect } from 'react';
import { useAllIssueStore } from '~/store/userStore';

import axios from 'axios';

const usePosts = (pageNum = 1) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});
  const [hasNextPage, setHasNextPage] = useState(false);
  const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
  });

  const getPostsPage = async (pageParam = 1, options = {}) => {
    const response = await api.get(`/posts?_page=${pageParam}`, options);
    return response.data;
  };
  const { getRepoAllIssues, repoAllIssues, setLoading, dataStatus } = useAllIssueStore(
    (state) => state,
  );

  useEffect(() => {
    setLoading();
    getRepoAllIssues({
      repo: 'clown_backend',
      params: {
        sort: 'created',
        order: 'desc',
        per_page: 10,
        page: pageNum,
      },
    });
  }, [pageNum]);

  return { dataStatus, isError, error, repoAllIssues };
};

export default usePosts;
