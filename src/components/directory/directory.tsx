import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './directory.scss';

interface IProps {
  userRepo: any;
}

const Directory: FC<IProps> = ({ userRepo }) => {
  const navigate = useNavigate();
  const onNavigateHandler = (item) => {
    navigate(`/repo/${item}`);
  };
  return (
    <div className='repo-container'>
      {userRepo &&
        userRepo.map((item, index) => {
          return (
            <div
              className='repo-container__box'
              key={index}
              onClick={() => onNavigateHandler(item)}
              aria-hidden
            >
              {item}
            </div>
          );
        })}
    </div>
  );
};
export default Directory;
