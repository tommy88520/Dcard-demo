import React from 'react';
import './post.scss';

interface iPost {
  title: string;
  body: string;
  id: string;
}
const Post = React.forwardRef(({ post }, ref) => {
  const postBody = (
    <>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p>Post ID: {post.id}</p>
    </>
  );

  const content = ref ? <article ref={ref}>{postBody}</article> : <article>{postBody}</article>;

  return content;
});

Post.displayName = 'Post';

export default Post;
