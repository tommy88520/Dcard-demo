import React, { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import IssueItem from '~/components/issue/issue';
import Spinner from '~/components/spinner/spinner';
import { setIssuePageStore } from '~/store/issueStore';
import { useAllIssueStore } from '~/store/userStore';

const Issue = () => {
  const [repoLoading, setRepoLoading] = useState(true);
  const location = useLocation();
  const { setIssuePageNumber } = setIssuePageStore((state) => state);
  const { setRepoAllIssues } = useAllIssueStore((state) => state);
  useEffect(() => {
    setIssuePageNumber(1);
    setRepoAllIssues('');
  }, [location]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setRepoLoading(false);
    }, 1000);
    return () => window.clearTimeout(timer);
  }, []);
  return <Fragment>{repoLoading ? <Spinner /> : <IssueItem />}</Fragment>;
};

export default Issue;
