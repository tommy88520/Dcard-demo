import React, { Fragment, useEffect, useState } from 'react';
import IssueItem from '~/components/issue/issue';
import Spinner from '~/components/spinner/spinner';

const Issue = () => {
  const [repoLoading, setRepoLoading] = useState(true);
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setRepoLoading(false);
    }, 1000);
    return () => window.clearTimeout(timer);
  }, []);
  return <Fragment>{repoLoading ? <Spinner /> : <IssueItem />}</Fragment>;
};

export default Issue;
