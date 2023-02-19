import { FC, Fragment } from 'react';
import EditIssueArea from '~/components/editIssue/editIssue';
import Spinner from '~/components/spinner/spinner';
interface IProps {
  issueProp: {
    button: string;
    number: number;
  };
}
const EditIssue: FC<IProps> = ({ issueProp }) => {
  const RepoLoading = false;
  return <Fragment>{RepoLoading ? <Spinner /> : <EditIssueArea issueProp={issueProp} />}</Fragment>;
};

export default EditIssue;
