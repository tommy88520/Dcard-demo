import EditIssueArea from '~/routes/editIssue';

import './noData.scss';
const NoData = () => {
  const createIssueProp = {
    button: 'Add Issue',
    number: 0,
  };
  return (
    <div className='typing'>
      <p className='typing-effect'>Let's made a Issue and discuss those problems with others...</p>
      <div>
        <EditIssueArea issueProp={createIssueProp} />
      </div>
    </div>
  );
};

export default NoData;
