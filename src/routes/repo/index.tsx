import React, { Fragment, useCallback, useEffect, useRef } from 'react';
import Directory from '~/components/directory/directory';
import { useInfiniteQuery } from 'react-query';
import Spinner from '~/components/spinner/spinner';
import { useRepoStore } from '~/store/userStore';

const Repo = () => {
  const { userRepo, getUserRepo } = useRepoStore((state) => state);
  useEffect(() => {
    if (!userRepo.length) return;
  }, []);
  const { fetchNextPage, hasNextPage, isFetchingNextPage, data, status } = useInfiniteQuery(
    '/repo',
    ({ pageParam = 1 }) => getUserRepo(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage) return lastPage.length ? allPages.length + 1 : undefined;
      },
    },
  );
  const intObserver = useRef<IntersectionObserver | null>(null);
  // const containerRef = useRef<IntersectionObserver | null>(null);
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
  const content = data?.pages.map((userRepo) => {
    return userRepo?.map((post, i) => {
      if (userRepo.length === i + 1) {
        return <Directory ref={lastPostRef} key={i} post={post} />;
      }
      return <Directory key={i} post={post} />;
    });
  });
  return (
    <Fragment>
      {status === 'error' ? (
        <Spinner />
      ) : (
        <div className='repo-container'>
          <h1>Choose your repo</h1>
          <div className='repo-container__section'>{content}</div>
          {!hasNextPage && <div className='repo-container__no-more'>No more data available!</div>}
        </div>
      )}
    </Fragment>
  );
};

export default Repo;
