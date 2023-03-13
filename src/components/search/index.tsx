import { Input } from 'antd';
import { useAllIssueStore } from '~/store/userStore';

const SearchItem = () => {
  const { getRepoAllIssues } = useAllIssueStore((state) => state);
  const params = {
    sort: 'created',
    per_page: 10,
    page: 1,
    noCache: true,
  };
  const onSearch = (value: string) => {
    getRepoAllIssues(
      {
        q: value,
        ...params,
      },
      'search',
    );
  };
  const changeSearch = (e) => {
    if (!e.target.value)
      getRepoAllIssues(
        {
          q: '',
          ...params,
        },
        'search',
      );
  };
  return (
    <div className='search-input'>
      <Input.Search
        allowClear
        placeholder='input search text'
        onSearch={onSearch}
        style={{ paddingLeft: 10 }}
        maxLength={30}
        onChange={changeSearch}
      />
    </div>
  );
};

export default SearchItem;
