import React, { Fragment, useEffect } from 'react';
import IssueItem from '~/components/issue/issue';
import Spinner from '~/components/spinner/spinner';
import { useAllIssueStore } from '~/store/userStore';
import { useParams } from 'react-router-dom';

const Issue = () => {
  const RepoLoading = false;
  const params = useParams();
  const { name } = params;
  const { getRepoAllIssues, repoAllIssues, getIssueQuery } = useAllIssueStore((state) => state);

  useEffect(() => {
    getRepoAllIssues({ repo: name });
  }, []);
  return (
    <Fragment>{RepoLoading ? <Spinner /> : <IssueItem repoAllIssues={repoAllIssues} />}</Fragment>
  );
};

export default Issue;
