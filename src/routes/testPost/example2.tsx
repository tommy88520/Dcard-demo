import { useState, useRef, useCallback, useEffect } from 'react';
import usePosts from '~/hook/usePost';
import Post from '~/components/post';
import { useAllIssueStore } from '~/store/userStore';

const Example1 = () => {
  const [pageNum, setPageNum] = useState(1);
  // const { isError, error, repoAllIssues, dataStatus } = usePosts(pageNum);
  const { getRepoAllIssues, repoAllIssues, setRepoAllIssues, setLoading, dataStatus } =
    useAllIssueStore((state) => state);
  const { loading, hasNextPage } = dataStatus;
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
  const intObserver = useRef();
  const lastPostRef = useCallback(
    (post) => {
      if (loading) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage) {
          console.log('We are near the last post!');
          setPageNum((prev) => prev + 1);
        }
      });

      if (post) intObserver.current.observe(post);
    },
    [loading, hasNextPage],
  );

  // if (isError) return <p className='center'>Error: {error.message}</p>;

  const content = repoAllIssues.map((post, i) => {
    if (repoAllIssues.length === i + 1) {
      return <Post ref={lastPostRef} key={i} post={post} />;
    }
    return <Post key={i} post={post} />;
  });

  return (
    <>
      <h1 id='top'>
        &infin; Infinite Query &amp; Scroll
        <br />
        &infin; Ex. 1 - React only
      </h1>
      {content}
      {loading && <p className='center'>Loading More Posts...</p>}
      <p className='center'>
        <a href='#top'>Back to Top</a>
      </p>
    </>
  );
};
export default Example1;
