import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Select } from 'antd';
import { Link, useParams } from 'react-router-dom';
// import { useAllIssueStore } from '~/store/userStore';
import { useAllIssueStore } from '~/store/userStore';

interface IDropProps {
  dropDownOption: { label: string; value: string }[];
}

const DropdownItem: React.FC<IDropProps> = ({ dropDownOption }) => {
  const params = useParams();
  const { getRepoAllIssues } = useAllIssueStore((state) => state);
  const { name } = params;

  const onChange = (value: string) => {
    const query = {
      repo: name,
      query: {
        state: 'open',
        labels: value,
        sort: 'created',
        direction: 'desc',
        per_page: 10,
        page: 1,
      },
    };

    getRepoAllIssues(query);
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };
  return (
    <Select
      showSearch
      placeholder='Select a person'
      optionFilterProp='children'
      onChange={onChange}
      onSearch={onSearch}
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      options={dropDownOption}
    />
  );
};

export default DropdownItem;
