import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import DropdownItem from '../dropDown';
import EditIssueArea from '~/routes/editIssue';
import { updateIssueStore } from '~/store/issueStore';

import './issue.scss';
interface IAllIssue {
  repoAllIssues: {
    title: string;
    number: number;
    label: {
      name: string;
      description: string;
    };
    body: string;
    created_at: Date;
  }[];
}

const IssueItem: FC<IAllIssue> = ({ repoAllIssues }) => {
  const { updateIssue } = updateIssueStore((state) => state);
  const dropDownOption = [
    {
      label: 'All',
      value: '',
    },
    {
      label: 'Open',
      value: 'Open',
    },
    {
      label: 'In progress',
      value: 'In progress',
    },
    {
      label: 'Done',
      value: 'Done',
    },
  ];
  const createIssueProp = {
    button: '新增',
    number: 0,
  };
  const updateIssueProp = {
    button: '修改',
  };
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
  return (
    <div>
      <DropdownItem dropDownOption={dropDownOption} />
      <EditIssueArea issueProp={createIssueProp} />
      {repoAllIssues.length ? (
        <div className='issue-item'>
          {repoAllIssues.map((item, index) => {
            return (
              <div className='issue-item__box' key={index} aria-hidden>
                <h3>{item.title}</h3>
                <p>{item.number}</p>
                <Tooltip title='delete'>
                  <Button
                    type='primary'
                    shape='circle'
                    icon={<CloseCircleOutlined />}
                    ghost={true}
                    onClick={() => deleteIssue(item.number)}
                  />
                </Tooltip>
                <div>
                  <p>{item.label.name}</p>
                </div>
                <p>{item.body}</p>
                <EditIssueArea issueProp={{ ...updateIssueProp, number: item.number }} />
              </div>
            );
          })}
        </div>
      ) : (
        <div>沒有資料</div>
      )}
    </div>
  );
};

export default IssueItem;
