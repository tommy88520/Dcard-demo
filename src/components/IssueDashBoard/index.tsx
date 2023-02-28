import React, { forwardRef, useRef } from 'react';
import { useParams } from 'react-router-dom';
import gsap, { Power2 } from 'gsap';
import { Button, Tooltip } from 'antd';
import ReactMarkdown from 'react-markdown';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { CloseOutlined } from '@ant-design/icons';

import EditIssueArea from '~/routes/editIssue';
import { updateIssueStore } from '~/store/issueStore';
import { backToTop } from '~/utils/backToTop';
import './issueDashBoard.scss';

const IssueDashBoard = forwardRef<HTMLInputElement>(({ post }, ref) => {
  const { updateIssue } = updateIssueStore((state) => state);
  const { name } = useParams();
  const deleteIssue = (e) => {
    const query = {
      repo: name,
      issue_number: e,
      issue: {
        state: 'closed',
      },
    };
    updateIssue(query, name);
    backToTop();
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 3000,
    });
  };
  const updateIssueProp = {
    button: 'Edit',
  };
  let menuLayer = useRef(null);
  const handleBox = (e) => {
    gsap.to(menuLayer, {
      y: e,
      ease: Power2.easeInOut,
    });
  };
  return (
    <div ref={ref} onMouseEnter={() => handleBox(-20)} onMouseLeave={() => handleBox(0)}>
      <div
        className='issue-item__box'
        ref={(el) => (menuLayer = el)}
        onMouseEnter={() => handleBox(-20)}
        onMouseLeave={() => handleBox(0)}
      >
        <div className='issue-item__header'>
          <p>No. {post.number}</p>
          <p
            className={`issue-item__label ${
              post.label.name === 'In progress'
                ? 'issue-item__label-progress'
                : 'issue-item__label-other'
            }`}
          >
            {post.label.name}
          </p>
          <Tooltip title='delete'>
            <Button
              type='primary'
              shape='circle'
              icon={<CloseOutlined />}
              ghost={true}
              onClick={() => deleteIssue(post.number)}
              className='delete-button'
            />
          </Tooltip>
        </div>
        <div className='issue-item__title'>
          <span>TITLE:</span> {post.title}
        </div>

        <div className='issue-item__markdown'>
          <span>CONTENT:</span>
          <ReactMarkdown className='issue-item__markdown-content'>{post.body}</ReactMarkdown>
        </div>
        <EditIssueArea issueProp={{ ...updateIssueProp, number: post.number }} />
      </div>
    </div>
  );
});
IssueDashBoard.displayName = 'IssueDashBoard';

export default IssueDashBoard;
