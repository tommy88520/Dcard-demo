import React, { forwardRef, useEffect, useRef } from 'react';
import gsap, { TimelineLite, Power2 } from 'gsap';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import EditIssueArea from '~/routes/editIssue';

import { updateIssueStore } from '~/store/issueStore';
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
  };
  const updateIssueProp = {
    button: '修改',
  };
  let menuLayer = useRef(null);
  const ref2 = typeof ref === 'function' ? ref : (el) => (menuLayer = el);
  const handleBox = (e) => {
    gsap.to(menuLayer, {
      y: e,
      ease: Power2.easeInOut,
      // startAt: {
      //   y: 10,
      // },
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
