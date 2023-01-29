import React, { FC, useEffect, useState } from 'react';
import { Button, Modal, Checkbox, Form, Input, Select } from 'antd';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { createIssueStore, updateIssueStore, useGetIssueDetailStore } from '~/store/issueStore';
// import { useAllIssueStore } from '~/store/userStore';
import './editIssue.scss';
import { useParams } from 'react-router-dom';

interface Values {
  repo: string;
  issue: {
    title: string;
    labels: string[];
    body: any;
  };
}

interface IProps {
  issueProp: {
    button: string;
    number: number;
  };
}

interface CollectionCreateFormProps {
  open: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
  confirmLoading: boolean;
  issueDetail: any;
  setBodyCheck: (e: boolean) => void;
  number: number;
}
const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
  confirmLoading,
  issueDetail,
  setBodyCheck,
  number,
}) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const editorRef = React.createRef<any>();
  const mobileRef = React.createRef<any>();
  const { name } = useParams();
  // const { getIssueDetail, issueDetail } = useGetIssueDetailStore((state) => state);

  const defaultForm = {
    modifier: 'public',
    title: issueDetail.title && issueDetail.title,
    labels: issueDetail ? issueDetail.label.name : 'Open',
  };

  useEffect(() => {
    if (form && issueDetail && number) form.setFieldsValue(defaultForm);
    if (editorRef.current && issueDetail && number)
      editorRef.current.getInstance().setMarkdown(issueDetail.body);
  }, [form, issueDetail]);

  return (
    <Modal
      open={open}
      title='Edit a collection'
      okText='Submit'
      cancelText='Cancel'
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            const data =
              editorRef.current.editorInst.getMarkdown() ||
              mobileRef.current.editorInst.getMarkdown();
            if (data.length < 5) {
              setBodyCheck(false);
              alert('描述字數不夠');
              return;
            }

            const result = {
              repo: name,
              issue: {
                ...values,
                labels: [values.labels],
                repo: name,
                body: data,
              },
            };
            onCreate(result);
            setBodyCheck(true);
            form.resetFields();
            editorRef.current.editorInst.reset();
            mobileRef.current.editorInst.reset();
          })
          .catch((error) => {
            console.log('Validate Failed:', error);
          });
      }}
    >
      <Form form={form} layout='vertical' name='form_in_modal'>
        <Form.Item
          name='title'
          label='Title'
          rules={[{ required: true, message: 'Please input the title of collection!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name='labels' label='Label' rules={[{ required: true }]}>
          <Select placeholder='Select a option and change input text above' allowClear>
            <Option value='OPEN'>Open</Option>
            <Option value='In progress'>In progress</Option>
            <Option value='Done'>Done</Option>
          </Select>
        </Form.Item>
      </Form>
      <div className='edit-container__desktop-editor'>
        <Editor
          initialValue=''
          previewStyle='vertical'
          height='400px'
          initialEditType='markdown'
          ref={editorRef}
          toolbarItems={[
            ['heading', 'bold'],
            ['ul', 'ol', 'task'],
            ['code', 'codeblock', 'link'],
          ]}
        />
      </div>
      <div className='edit-container__mobile-editor'>
        <Editor
          initialValue={issueDetail.body || ''}
          previewStyle='vertical'
          height='200px'
          initialEditType='wysiwyg'
          ref={mobileRef}
          toolbarItems={[]}
        />
      </div>
    </Modal>
  );
};

const EditIssueArea: FC<IProps> = ({ issueProp }) => {
  const { name } = useParams();
  const { number } = issueProp;
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [bodyCheck, setBodyCheck] = useState(true);
  const { createIssue } = createIssueStore((state) => state);
  const { updateIssue } = updateIssueStore((state) => state);
  const { getIssueDetail, issueDetail } = useGetIssueDetailStore((state) => state);

  const onCreate = (values: Values) => {
    if (issueProp.number) {
      updateIssue({ ...values, issue_number: number }, name);
    } else {
      createIssue(values, name);
    }
    setConfirmLoading(true);
    if (bodyCheck) {
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
      }, 2000);
    }
  };

  const clickButton = () => {
    const query = {
      repo: name,
      issue_number: number,
    };
    getIssueDetail(query);
    setOpen(true);
  };
  return (
    <div className='edit-container'>
      <Button type='primary' onClick={clickButton}>
        {issueProp.button}
      </Button>
      {open && (
        <CollectionCreateForm
          open={open}
          onCreate={onCreate}
          onCancel={() => {
            setOpen(false);
          }}
          confirmLoading={confirmLoading}
          issueDetail={issueDetail}
          setBodyCheck={setBodyCheck}
          number={number}
        />
      )}
    </div>
  );
};

export default EditIssueArea;
