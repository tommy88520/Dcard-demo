import React, { Fragment, useEffect } from 'react';
import IssueItem from '~/components/issue/issue';
import Spinner from '~/components/spinner/spinner';
import { useAllIssueStore } from '~/store/userStore';
import { useParams } from 'react-router-dom';

const Issue = () => {
  const RepoLoading = false;
  const params = useParams();
  const { name } = params;
  const { getRepoAllIssues, repoAllIssues } = useAllIssueStore((state) => state);

  useEffect(() => {
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
    getRepoAllIssues(query);
  }, []);
  return (
    <Fragment>{RepoLoading ? <Spinner /> : <IssueItem repoAllIssues={repoAllIssues} />}</Fragment>
  );
};

export default Issue;
