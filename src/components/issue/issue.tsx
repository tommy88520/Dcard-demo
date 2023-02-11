import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import DropdownItem from '../dropDown';
import EditIssueArea from '~/routes/editIssue';
import SearchItem from '../search';
import { useAllIssueStore } from '~/store/userStore';
import IssueDashBoard from '~/components/IssueDashBoard';
import Spinner from '~/components/spinner/spinner';

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

const IssueItem = () => {
  const params = useParams();
  const { name } = params;
  const [pageNum, setPageNum] = useState(1);
  const { getRepoAllIssues, repoAllIssues, setLoading, dataStatus } = useAllIssueStore(
    (state) => state,
  );

  useEffect(() => {
    setLoading();
    getRepoAllIssues(
      {
        repo: name,
        params: {
          sort: 'created',
          order: 'desc',
          per_page: 10,
          page: pageNum,
        },
      },
      'page',
    );
    console.log(repoAllIssues);
  }, [pageNum]);
  const { loading, hasNextPage } = dataStatus;

  const issueObserver = useRef();
  const lastPostRef = useCallback(
    (post) => {
      if (loading) return;

      if (issueObserver.current) issueObserver.current.disconnect();

      issueObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage) {
          console.log('We are near the last post!');
          setPageNum((prev) => prev + 1);
        }
      });

      if (post) issueObserver.current.observe(post);
    },
    [loading, hasNextPage],
  );
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
  const Content = () => {
    return (
      <div className='issue-item'>
        {repoAllIssues &&
          repoAllIssues.map((post, i) => {
            if (repoAllIssues.length === i + 1) {
              return <IssueDashBoard ref={lastPostRef} key={i} post={post} />;
            }
            return <IssueDashBoard key={i} post={post} />;
          })}
      </div>
    );
  };

  return (
    <div>
      <DropdownItem dropDownOption={dropDownOption} />
      <EditIssueArea issueProp={createIssueProp} />
      <SearchItem />
      <Content />
    </div>
  );
};

export default IssueItem;
