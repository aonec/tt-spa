import React from 'react';
import {
  Form,
  Input,
  InputNumber,
  Checkbox,
  Select,
  DatePicker,
} from 'formik-antd';
import { Formik } from 'formik';
import { ButtonTT, InputTT } from '../../../../../tt-components';
import styled, { css } from 'styled-components';
import * as Yup from 'yup';

export const Example = () => {
  const handleSubmit = (values: any) => {};

  return (
    <Formik
      initialValues={{ firstName: '', age: 20, newsletter: false }}
      validationSchema={Yup.object({
        firstName: Yup.string().required('PLEASE'),
      })}
      render={() => (
        <Form>
          {/* every formik-antd component must have the 'name' prop set: */}
          <Form.Item label={'firstName'} name="firstName">
            <InputFormik placeholder="firstName" name="firstName" />
          </Form.Item>
          <ButtonTT type={'submit'}>handleSubmit</ButtonTT>
        </Form>
      )}
      onSubmit={(values, actions) => {
        handleSubmit(values);
      }}
    />
  );
};
export default Example;

export const InputNumberFormik = styled(InputNumber)`
  color: rgba(39, 47, 90, 0.8);
  box-sizing: border-box;
  border-radius: 4px;
  width: 100%;
  height: ${(props) => props.height || '48px'};
  padding: 8px 24px;
  font-size: 16px;
  line-height: 32px;
`;

export const InputFormik = styled(Input)`
  color: rgba(39, 47, 90, 0.8);
  box-sizing: border-box;
  border-radius: 4px;
  width: 100%;
  height: ${(props) => props.height || '48px'};
  padding: 8px 24px;
  font-size: 16px;
  line-height: 32px;
`;

export const SelectFormik = styled(Select)`
  height: 48px;
   {
    //Select Dropdown
    .ant-select-item {
      margin: 0 !important;
      //border: 1px solid black;
      padding: 0 !important;

      &:hover {
        background: #189ee9 !important;
        color: #ffffff;
      }

      .ant-select-item-option-content {
        background: white;
        padding: 8px 24px !important;
        margin: 0 !important;

        &:hover {
          background: #189ee9 !important;
          color: #ffffff;
        }
      }
    }

    .ant-select-selector {
      height: 100% !important;
      padding: 8px 24px !important;

      span {
        font-size: 16px;
        line-height: 32px;
      }
    }

    .ant-select-arrow {
      padding: 0 28px !important;
    }
  }
`;

export const DatePickerFormik = styled(DatePicker)`
  height: 48px;
  width: 100%;
  .ant-picker-range {
    height: 100% !important;
    padding: 8px 24px !important;

    span {
      font-size: 16px;
      line-height: 32px;
    }
  }
`;
