import { ErrorMessage } from '01/features/contractors/addContractors';
import { DatePickerTT } from '01/tt-components';
import { Form } from 'antd';
import { useFormik } from 'formik';
import React, { FC } from 'react';
import { FieldsWrapper, Wrapper } from './ApartmentActForm.styled';
import { apartmentActFormProps } from './ApartmentActForm.types';

export const ApartmentActForm: FC<apartmentActFormProps> = ({
  formId,
  handleSubmit,
}) => {

  return (
    <Wrapper>
      <FieldsWrapper>
        <Form.Item label="Дата">

        </Form.Item>
      </FieldsWrapper>
    </Wrapper>
  );
};
