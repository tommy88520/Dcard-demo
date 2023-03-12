import React from 'react';
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
        noCache: false,
      },
      'search',
    );
  };

  return (
    <Select
      showSearch
      placeholder='Select issue status'
      optionFilterProp='children'
      onChange={onChange}
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      options={dropDownOption}
    />
  );
};

export default DropdownItem;
