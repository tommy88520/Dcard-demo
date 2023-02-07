import React, { Fragment, useCallback, useEffect, useRef } from 'react';
import Directory from '~/components/directory/directory';
import { useInfiniteQuery } from 'react-query';
import Spinner from '~/components/spinner/spinner';
import { useRepoStore } from '~/store/userStore';
const Repo = () => {
  const RepoLoading = false;
  const { userRepo, getUserRepo } = useRepoStore((state) => state);
  // console.log(params);
  const {
    fetchNextPage, //function
    hasNextPage, // boolean
    isFetchingNextPage, // boolean
    data,
    status,
    error,
  } = useInfiniteQuery('/posts', ({ pageParam = 1 }) => getUserRepo(pageParam), {
    getNextPageParam: (lastPage, allPages) => {
      return lastPage ? allPages.length + 1 : undefined;
    },
  });
  const intObserver = useRef();
  const lastPostRef = useCallback(
    (post) => {
      if (isFetchingNextPage) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage) {
          console.log('We are near the last post!');
          fetchNextPage();
        }
      });

      if (post) intObserver.current.observe(post);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage],
  );
  const content = data?.pages.map((pg, i) => {
    return <Directory userRepo={userRepo} key={i} />;
    // return pg.map((post, i) => {
    //   if (pg.length === i + 1) {
    //     return <Post ref={lastPostRef} key={post.id} post={post} />;
    //   }
    //   return <Post key={post.id} post={post} />;
    // });
  });
  // useEffect(() => {
  //   if (localStorage.getItem('dcard-login')) getUserRepo(2);
  // }, []);
  return (
    <Fragment>{status === 'error' ? <Spinner /> : <Directory userRepo={userRepo} />}</Fragment>
  );
};

export default Repo;
