import React, { Fragment } from 'react';
import IssueItem from '~/components/issue/issue';
import Spinner from '~/components/spinner/spinner';

const Issue = () => {
  const RepoLoading = false;
  return <Fragment>{RepoLoading ? <Spinner /> : <IssueItem />}</Fragment>;
};

export default Issue;
