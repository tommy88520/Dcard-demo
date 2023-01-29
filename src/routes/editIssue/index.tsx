import React, { FC, Fragment, useEffect, useRef } from 'react';
import EditIssueArea from '~/components/editIssue/editIssue';
import Spinner from '~/components/spinner/spinner';
// import { useParams } from 'react-router-dom';
// import { useGetIssueDetailStore } from '~/store/issueStore';

interface IProps {
  issueProp: {
    button: string;
    number: number;
  };
}
const EditIssue: FC<IProps> = ({ issueProp }) => {
  const RepoLoading = false;
  // const { number } = issueProp;
  // const { name } = useParams();
  // const { issueDetail, getIssueDetail } = useGetIssueDetailStore((state) => state);
  // useEffect(() => {
  //   const query = {
  //     repo: name,
  //     issue_number: 1,
  //   };
  //   if (number) getIssueDetail(query);
  //   console.log(issueDetail);
  // }, []);
  return <Fragment>{RepoLoading ? <Spinner /> : <EditIssueArea issueProp={issueProp} />}</Fragment>;
};

export default EditIssue;
