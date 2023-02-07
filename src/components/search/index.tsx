import { Input } from 'antd';
import { useAllIssueStore } from '~/store/userStore';

const SearchItem = () => {
  const { getRepoAllIssues } = useAllIssueStore((state) => state);
  const onSearch = (value: string) => getRepoAllIssues({ q: value });
  return (
    <div>
      <Input.Search
        allowClear
        placeholder='input search text'
        onSearch={onSearch}
        style={{ width: 200 }}
        maxLength={30}
      />
    </div>
  );
};

export default SearchItem;
