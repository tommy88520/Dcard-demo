import React, { FC, useEffect, forwardRef, useCallback, ForwardedRef } from 'react';
import { useParams } from 'react-router-dom';

import { CloseOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import EditIssueArea from '~/routes/editIssue';

import { updateIssueStore } from '~/store/issueStore';

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
  return (
    <div ref={ref && ref} className='issue-item__box' aria-hidden>
      <h3>{post.title}</h3>
      <p>{post.number}</p>
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
      <div>
        <p>{post.label.name}</p>
      </div>
      <p>{post.body}</p>
      <EditIssueArea issueProp={{ ...updateIssueProp, number: post.number }} />
    </div>
  );
});
IssueDashBoard.displayName = 'IssueDashBoard';

export default IssueDashBoard;
