import React, { Fragment, useEffect } from 'react';
import Directory from '~/components/directory/directory';
import Spinner from '~/components/spinner/spinner';
import { useRepoStore } from '~/store/userStore';
const Repo = () => {
  const RepoLoading = false;
  const { userRepo, getUserRepo } = useRepoStore((state) => state);
  useEffect(() => {
    if (localStorage.getItem('dcard-login')) getUserRepo();
  });
  return <Fragment>{RepoLoading ? <Spinner /> : <Directory userRepo={userRepo} />}</Fragment>;
};

export default Repo;
