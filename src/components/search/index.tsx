import { Input } from 'antd';
import { useState } from 'react';
import { useAllIssueStore } from '~/store/userStore';

const SearchItem = () => {
  const { getRepoAllIssues } = useAllIssueStore((state) => state);
  const params = {
    sort: 'created',
    order: 'desc',
    per_page: 10,
    page: 1,
  };
  const onSearch = (value: string) => {
    getRepoAllIssues(
      {
        q: value,
        params,
      },
      'search',
    );
  };
  const changeSearch = (e) => {
    if (!e.target.value)
      getRepoAllIssues(
        {
          q: '',
          params,
        },
        'search',
      );
  };
  return (
    <div>
      <Input.Search
        allowClear
        placeholder='input search text'
        onSearch={onSearch}
        style={{ width: 200 }}
        maxLength={30}
        onChange={changeSearch}
      />
    </div>
  );
};

export default SearchItem;
