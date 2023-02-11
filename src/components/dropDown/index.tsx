import React, { useState } from 'react';
import { Select } from 'antd';
import { useAllIssueStore } from '~/store/userStore';

interface IDropProps {
  dropDownOption: { label: string; value: string }[];
}

const DropdownItem: React.FC<IDropProps> = ({ dropDownOption }) => {
  const { getRepoAllIssues } = useAllIssueStore((state) => state);

  const onChange = (value: string) => {
    getRepoAllIssues(
      {
        label: value,
        params: {
          sort: 'created',
          order: 'desc',
          per_page: 10,
          page: 1,
        },
      },
      'search',
    );
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
