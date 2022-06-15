import { FilesUpload } from '01/shared/ui/FilesUpload';
import { Select } from '01/shared/ui/Select';
import { DatePickerTT, InputTT } from '01/tt-components';
import { Form } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { EActResourceType, EActType } from 'myApi';
import React, { FC, SyntheticEvent } from 'react';
import { ResourceInfo } from 'ui-kit/shared_components/ResourceInfo';
import {
  ErrorMessage,
  FieldsWrapper,
  SelectSC,
} from './CreateApartmentActForm.styled';
import {
  actResourceTypes,
  CreateApartmentActFormProps,
} from './CreateApartmentActForm.types';
import * as yup from 'yup';
import { CreateActFormPayload } from '../../createApartmentActService.types';

export const CreateApartmentActForm: FC<CreateApartmentActFormProps> = ({
  formId,
  handleSubmit,
  actTypes,
}) => {
  const {
    values,
    setFieldValue,
    handleSubmit: submitForm,
    errors,
  } = useFormik<CreateActFormPayload>({
    initialValues: {
      actJobDate: '',
      registryNumber: '',
      actResourceType: '' as EActResourceType,
      actType: '' as EActType,
      documentId: null,
    },
    validationSchema: yup.object().shape({
      actJobDate: yup.string().required('Это поле обязательно'),
      registryNumber: yup.string().required('Это поле обязательно'),
      actResourceType: yup.string().required('Это поле обязательно'),
      actType: yup.string().required('Это поле обязательно'),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: handleSubmit,
  });

  return (
    <Form id={formId} onSubmitCapture={submitForm}>
      <FieldsWrapper>
        <Form.Item label="Дата">
          <DatePickerTT
            format="DD.MM.YYYY"
            onChange={(e) => setFieldValue('actJobDate', e?.toISOString(true))}
            value={values.actJobDate ? moment(values.actJobDate) : null}
          />
          <ErrorMessage>{errors.actJobDate}</ErrorMessage>
        </Form.Item>

        <Form.Item label="Номер документа">
          <InputTT
            value={values.registryNumber}
            onChange={(e: SyntheticEvent<HTMLInputElement>) =>
              setFieldValue('registryNumber', e.currentTarget.value)
            }
            placeholder="Введите номер"
          />
          <ErrorMessage>{errors.registryNumber}</ErrorMessage>
        </Form.Item>

        <Form.Item label="Ресурс">
          <Select
            placeholder="Выберите"
            value={values.actResourceType || undefined}
            onChange={(value) =>
              setFieldValue('actResourceType', value as EActResourceType)
            }
          >
            {actResourceTypes?.map((elem) => (
              <Select.Option key={elem} value={elem}>
                <ResourceInfo resource={elem} />
              </Select.Option>
            ))}
          </Select>
          <ErrorMessage>{errors.actResourceType}</ErrorMessage>
        </Form.Item>

        <Form.Item label="Тип акта">
          <SelectSC>
            <Select
              placeholder="Выберите"
              value={values.actType || undefined}
              onChange={(value) => setFieldValue('actType', value as EActType)}
            >
              {actTypes?.map(({ key, value }) => (
                <Select.Option value={key!} key={key}>
                  {value}
                </Select.Option>
              ))}
            </Select>
          </SelectSC>

          <ErrorMessage>{errors.actType}</ErrorMessage>
        </Form.Item>
      </FieldsWrapper>
      <FilesUpload
        text="Добавьте акт допуска"
        uniqId="apartment-acts"
        onChange={(value) => {
          setFieldValue('documentId', value[0]?.fileResponse?.id);
        }}
        max={1}
      />
    </Form>
  );
};
