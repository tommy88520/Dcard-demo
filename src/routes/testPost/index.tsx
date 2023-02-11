import { useRef, useCallback } from 'react';
import Post from '~/components/post';
import { useInfiniteQuery } from 'react-query';
import { useRepoStore } from '~/store/userStore';
import axios from 'axios';
import { log } from 'console';
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

const getPostsPage = async (pageParam = 1, options = {}) => {
  const response = await api.get(`/posts?_page=${pageParam}`, options);
  return response.data;
};

const Example2 = () => {
  const { userRepo, getUserRepo } = useRepoStore((state) => state);
  const {
    fetchNextPage, //function
    hasNextPage, // boolean
    isFetchingNextPage, // boolean
    data,
    status,
    error,
  } = useInfiniteQuery('/posts', ({ pageParam = 1 }) => getUserRepo(pageParam), {
    getNextPageParam: (lastPage, allPages) => {
      console.log(allPages);
      return lastPage.length ? allPages.length + 1 : undefined;
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

  if (status === 'error') return <p className='center'>Error: {error.message}</p>;

  const content = data?.pages.map((pg) => {
    console.log(pg);
    return pg.map((post, i) => {
      if (pg.length === i + 1) {
        return <Post ref={lastPostRef} key={post.id} post={post} />;
      }
      return <Post key={post.id} post={post} />;
    });
  });

  return (
    <>
      <h1 id='top'>
        &infin; Infinite Query &amp; Scroll
        <br />
        &infin; Ex. 2 - React Query
      </h1>
      {content}
      {isFetchingNextPage && <p className='center'>Loading More Posts...</p>}
      <p className='center'>
        <a href='#top'>Back to Top</a>
      </p>
    </>
  );
};
export default Example2;
