import React, { FC, useEffect, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './directory.scss';

const Directory = forwardRef<HTMLInputElement>(({ post }, ref) => {
  const navigate = useNavigate();
  const onNavigateHandler = (item) => {
    navigate(`/repo/${item}`);
  };
  return (
    <div
      ref={ref && ref}
      className='repo-container__box'
      onClick={() => onNavigateHandler(post)}
      aria-hidden
    >
      <h2>{post}</h2>
    </div>
  );
});

Directory.displayName = 'Directory';
export default Directory;
