import { Form } from 'antd';
import { EActResourceType, EActType, EDocumentType } from 'api/types';
import React, { FC, useState } from 'react';
import { ResourceInfo } from 'ui-kit/shared/ResourceInfo';
import {
  Comment,
  DatePickerSC,
  ErrorMessage,
  FieldsWrapper,
  SelectSC,
} from './CreateApartmentActForm.styled';
import {
  actResourceTypes,
  CreateApartmentActFormProps,
} from './CreateApartmentActForm.types';
import { Document, DocumentsUploadContainer } from 'ui-kit/DocumentsService';
import { Input } from 'ui-kit/Input';
import { Select } from 'ui-kit/Select';
import { ActTypesNamesLookup } from 'dictionaries';
import { getDatePickerValue } from 'utils/getDatePickerValue';
import { useFormik } from 'formik';
import * as yup from 'yup';

export const CreateApartmentActForm: FC<CreateApartmentActFormProps> = ({
  formId,
  handleSubmit: handleSubmitForm,
}) => {
  const { values, setFieldValue, errors, handleSubmit } = useFormik({
    initialValues: {
      actJobDate: '',
      registryNumber: '',
      actResourceType: EActResourceType.All,
      actType: EActType.Admission,
      documentId: null,
      comment: '',
    },
    validationSchema: yup.object().shape({
      actJobDate: yup.string().required('Это поле обязательно'),
      registryNumber: yup.string().required('Это поле обязательно'),
      actResourceType: yup.string().required('Это поле обязательно'),
      actType: yup.string().required('Это поле обязательно'),
    }),
    validateOnChange: false,
    onSubmit: (data) => {
      handleSubmitForm(data);
    },
  });

  const [documents, setDocuments] = useState<Document[]>([]);

  return (
    <Form id={formId} onSubmitCapture={() => handleSubmit()}>
      <FieldsWrapper>
        <Form.Item label="Дата">
          <DatePickerSC
            format={{ format: 'DD.MM.YYYY', type: 'mask' }}
            value={getDatePickerValue(values.actJobDate)}
            onChange={(e) =>
              e && setFieldValue('actJobDate', e.format('YYYY-MM-DD'))
            }
          />
          <ErrorMessage>{errors.actJobDate}</ErrorMessage>
        </Form.Item>

        <Form.Item label="Номер документа">
          <Input
            value={values.registryNumber || undefined}
            onChange={(e) =>
              setFieldValue('registryNumber', e.currentTarget.value)
            }
            placeholder="Введите номер"
          />
          <ErrorMessage>{errors.registryNumber}</ErrorMessage>
        </Form.Item>

        <Form.Item label="Ресурс">
          <Select
            placeholder="Выберите"
            value={values.actResourceType}
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
              value={values.actType}
              onChange={(value) => setFieldValue('actType', value as EActType)}
            >
              {Object.entries(ActTypesNamesLookup).map(([key, value]) => (
                <Select.Option value={key} key={key}>
                  {value}
                </Select.Option>
              ))}
            </Select>
          </SelectSC>
          <ErrorMessage>{errors.actType}</ErrorMessage>
        </Form.Item>
      </FieldsWrapper>
      <DocumentsUploadContainer
        documents={documents}
        uniqId="edit-apartment-act-form"
        onChange={(files) => {
          setDocuments(files);
          setFieldValue('documentId', files[0]?.id);
        }}
        max={1}
        type={EDocumentType.Common}
      />

      <Comment
        placeholder="Комментарий"
        autoSize={{ minRows: 2, maxRows: 6 }}
        value={values.comment as string}
        onChange={(value) => setFieldValue('comment', value.target.value)}
      />
    </Form>
  );
};
