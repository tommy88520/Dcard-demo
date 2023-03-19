import React, { FC, useEffect, useState } from 'react';
import { Button, Modal, Form, Input, Select } from 'antd';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { createIssueStore, updateIssueStore, useGetIssueDetailStore } from '~/store/issueStore';
import './editIssue.scss';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { backToTop } from '~/utils/backToTop';

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
  mobileEditer: boolean;
}
const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
  confirmLoading,
  issueDetail,
  setBodyCheck,
  number,
  mobileEditer,
}) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const editorRef = React.createRef<any>();
  const mobileRef = React.createRef<any>();
  const { name } = useParams();

  const defaultForm = {
    modifier: 'public',
    title: issueDetail.title && issueDetail.title,
    labels: issueDetail ? issueDetail.label.name : 'Open',
  };

  useEffect(() => {
    if (form && issueDetail && number) form.setFieldsValue(defaultForm);
    if (editorRef.current && mobileRef.current && issueDetail && number) {
      editorRef.current.getInstance().setMarkdown(issueDetail.body || '');
      mobileRef.current.getInstance().setMarkdown(issueDetail.body || '');
    }
  }, [form, issueDetail]);

  return (
    <Modal
      open={open}
      title={number == 0 ? `Create a issue` : `Edit No.${number} issue`}
      okText='Submit'
      cancelText='Cancel'
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            const data = mobileEditer
              ? mobileRef.current.editorInst.getMarkdown()
              : editorRef.current.editorInst.getMarkdown();
            if (data.length < 30) {
              setBodyCheck(false);
              Swal.fire('描述字數不夠');
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
            // @ts-ignore
            onCreate(result);
            setBodyCheck(true);
            form.resetFields();
            editorRef.current.editorInst.reset();
            mobileRef.current.editorInst.reset();
            backToTop();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Your work has been saved',
              showConfirmButton: false,
              timer: 3000,
            });
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
          initialValue=''
          previewStyle='vertical'
          height='200px'
          initialEditType='markdown'
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
  const [mobileEditer, setMobileEditer] = useState(false);
  const { createIssue } = createIssueStore((state) => state);
  const { updateIssue } = updateIssueStore((state) => state);
  const { getIssueDetail, issueDetail } = useGetIssueDetailStore((state) => state);
  function handleResize() {
    if (window.innerWidth < 768) {
      setMobileEditer(true);
    } else {
      setMobileEditer(false);
    }
  }
  useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, [window.innerWidth]);

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
    if (number) {
      getIssueDetail(query);
    }
    setOpen(true);
    handleResize();
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
          mobileEditer={mobileEditer}
        />
      )}
    </div>
  );
};

export default EditIssueArea;
