import { Form } from 'antd';
import { EActResourceType, EActType, EDocumentType } from 'api/types';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { actResourceTypes } from 'services/apartments/createApartmentActService/view/CreateApartmentActForm/CreateApartmentActForm.types';
import {
  DatePickerSC,
  ErrorMessage,
  FieldsWrapper,
  SelectSC,
} from './EditApartmentActForm.styled';
import { EditApartmentActFormProps } from './EditApartmentActForm.types';
import { ResourceInfo } from 'ui-kit/shared/ResourceInfo';
import { DocumentsUploadContainer, Document } from 'ui-kit/DocumentsService';
import { Input } from 'ui-kit/Input';
import { Select } from 'ui-kit/Select';
import { ActTypesNamesLookup } from 'dictionaries';
import { getDatePickerValue } from 'utils/getDatePickerValue';
import { useFormik } from 'formik';
import * as yup from 'yup';

export const EditApartmentActForm: FC<EditApartmentActFormProps> = ({
  formId,
  initialValues,
  handleDeleteAct,
  handleSubmitForm,
}) => {
  const initialDocument = initialValues?.document;
  const [documents, setDocuments] = useState<Document[]>([]);

  const { values, setFieldValue, errors, handleSubmit } = useFormik({
    initialValues: {
      actJobDate: initialValues?.actJobDate,
      registryNumber: initialValues?.registryNumber,
      actResourceType: initialValues?.actResourceType,
      actType: initialValues?.actType,
      documentId: initialDocument?.id,
    },
    validationSchema: yup.object().shape({
      actJobDate: yup.string().required('Это поле обязательно'),
      registryNumber: yup.string().required('Это поле обязательно'),
      actResourceType: yup.string().required('Это поле обязательно'),
      actType: yup.string().required('Это поле обязательно'),
    }),
    onSubmit: (data) => {
      handleSubmitForm(data);
    },
  });

  const handleSubmitCapture = useCallback(() => {
    if (initialDocument && !documents[0]) {
      handleDeleteAct();
    }
    handleSubmit();
  }, [initialDocument, documents, handleDeleteAct, handleSubmit]);

  useEffect(() => {
    if (!initialDocument) return;

    setDocuments([initialDocument]);
  }, [initialDocument]);

  return (
    <Form id={formId} onSubmitCapture={handleSubmitCapture}>
      <FieldsWrapper>
        <Form.Item label="Дата">
          <DatePickerSC
            format="DD.MM.YYYY"
            value={getDatePickerValue(values.actJobDate)}
            onChange={(e) =>
              setFieldValue('actJobDate', e?.format('YYYY-MM-DD'))
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
          if (files.length === 0) {
            return setFieldValue('documentId', null);
          }
          setFieldValue('documentId', files[0]?.id);
        }}
        max={1}
        type={EDocumentType.Common}
      />
    </Form>
  );
};
