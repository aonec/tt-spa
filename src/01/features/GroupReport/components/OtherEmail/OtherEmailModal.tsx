import React, { Dispatch, SetStateAction } from 'react';
import ButtonTT from '../../../../tt-components/ButtonTT';
import styled from 'styled-components';
import { Modal, Form, Button } from 'antd';
import { ReportModalType } from '../../../../_pages/Objects/ObjectsSearchForm/components/Header';
import { useFormik } from 'formik';
import InputTT from '../../../../tt-components/InputTT';
import { GroupReportValuesInterface } from '../GroupReport';

const OtherEmailModal = ({
  visible,
  setVisible,
  groupReportFormState,
}: {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<ReportModalType>>;
  groupReportFormState: GroupReportValuesInterface | undefined;
}) => {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: (values, actions) => {
      debugger;
      alert(JSON.stringify(values, null, 2));
      setTimeout(() => actions.setSubmitting(false), 1000);
      // sendEmail(values, email)
      //   .then(() => setIsVisible(undefined))
      //   .catch((e) => setError(e));
    },
  });
  return (
    <StyledModal
      // confirmLoading={formik.isSubmitting}
      confirmLoading={true}
      visible={visible}
      title={<Header>Новая почта для отправки отчёта</Header>}
      width={800}
      onCancel={() => setVisible(undefined)}
      onOk={() => formik.handleSubmit()}
      footer={
        <Footer>
          <ButtonTT color={'white'} onClick={() => setVisible(undefined)}>
            Отмена
          </ButtonTT>
          <Button
            type="primary"
            color={'blue'}
            onClick={() => formik.handleSubmit()}
            loading={formik.isSubmitting}
            // disabled={formik.isSubmitting}
          >
            Отправить отчёт
          </Button>
        </Footer>
      }
    >
      <Form>
        <Form.Item name="email">
          {/*{error ? <div> error.message</div> : null}*/}
          <InputTT
            name="email"
            placeholder="Email"
            onChange={formik.handleChange}
          />
        </Form.Item>
      </Form>
    </StyledModal>
  );
};

const Footer = styled.div`
  background-color: var(--bg);
  height: 96px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 32px;
  font-weight: 700;
`;

const Header = styled.h1`
  font-size: 32px;
  line-height: 1.5;
  font-weight: 300;
  margin: 0;
`;

const StyledModal = styled(Modal)`
  .ant-modal-header {
    padding: 24px 32px;
    border: 0;
  }

  .ant-modal-body {
    padding: 0 32px 32px 32px;
  }

  .ant-modal-footer {
    padding: 0;
  }

  .ant-modal-close-x {
    fill: var(--main-100);
  }

  .ant-modal-footer button + button {
    margin-bottom: 0;
    margin-left: 16px;
  }
`;

export default OtherEmailModal;
