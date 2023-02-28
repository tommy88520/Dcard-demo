import React, { useState } from 'react';
import { Select } from 'antd';
// import Swal from 'sweetalert2/dist/sweetalert2.js';
import { useAllIssueStore } from '~/store/userStore';
// import { backToTop } from '~/utils/backToTop';

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
      placeholder='Select a person'
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
