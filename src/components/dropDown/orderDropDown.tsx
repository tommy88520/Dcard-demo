import React from 'react';
import { Select } from 'antd';
import { useAllIssueStore } from '~/store/userStore';

interface IDropProps {
  orderDropDownOption: { label: string; value: string }[];
}

const OrderDropdownItem: React.FC<IDropProps> = ({ orderDropDownOption }) => {
  const { getRepoAllIssues } = useAllIssueStore((state) => state);

  const onChange = (value: string) => {
    getRepoAllIssues(
      {
        sort: 'created',
        order: value,
        per_page: 10,
        page: 1,
        noCache: true,
      },
      'search',
    );
  };

  return (
    <Select
      showSearch
      placeholder='Select date sort'
      optionFilterProp='children'
      onChange={onChange}
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      options={orderDropDownOption}
    />
  );
};

export default OrderDropdownItem;
