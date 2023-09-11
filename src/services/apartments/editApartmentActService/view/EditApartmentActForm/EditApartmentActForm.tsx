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
import { useForm } from 'effector-forms';
import { getDatePickerValue } from 'utils/getDatePickerValue';

export const EditApartmentActForm: FC<EditApartmentActFormProps> = ({
  formId,
  initialValues,
  handleDeleteAct,
  form,
}) => {
  const initialDocument = initialValues?.document;
  const [documents, setDocuments] = useState<Document[]>([]);

  const { submit, fields } = useForm(form);

  const handleSubmitForm = useCallback(() => {
    if (initialDocument && !documents[0]) {
      handleDeleteAct();
    }
    submit();
  }, [initialDocument, documents, handleDeleteAct, submit]);

  useEffect(() => {
    if (!initialDocument) return;

    setDocuments([initialDocument]);
  }, [initialDocument]);

  return (
    <Form id={formId} onSubmitCapture={handleSubmitForm}>
      <FieldsWrapper>
        <Form.Item label="Дата">
          <DatePickerSC
            format="DD.MM.YYYY"
            onChange={(e) =>
              fields.actJobDate?.onChange(e?.format('YYYY-MM-DD'))
            }
            value={getDatePickerValue(fields.actJobDate?.value)}
          />
          <ErrorMessage>{fields.actJobDate?.errorText()}</ErrorMessage>
        </Form.Item>

        <Form.Item label="Номер документа">
          <Input
            value={fields.registryNumber?.value || undefined}
            onChange={(e) =>
              fields.registryNumber?.onChange(e.currentTarget.value)
            }
            placeholder="Введите номер"
          />
          <ErrorMessage>{fields.registryNumber?.errorText()}</ErrorMessage>
        </Form.Item>

        <Form.Item label="Ресурс">
          <Select
            placeholder="Выберите"
            value={fields.actResourceType?.value || undefined}
            onChange={(value) =>
              fields.actResourceType?.onChange(value as EActResourceType)
            }
          >
            {actResourceTypes?.map((elem) => (
              <Select.Option key={elem} value={elem}>
                <ResourceInfo resource={elem} />
              </Select.Option>
            ))}
          </Select>
          <ErrorMessage>{fields.actResourceType?.errorText()}</ErrorMessage>
        </Form.Item>

        <Form.Item label="Тип акта">
          <SelectSC>
            <Select
              placeholder="Выберите"
              value={fields.actType?.value || undefined}
              onChange={(value) => fields.actType?.onChange(value as EActType)}
            >
              {Object.entries(ActTypesNamesLookup).map(([key, value]) => (
                <Select.Option value={key} key={key}>
                  {value}
                </Select.Option>
              ))}
            </Select>
          </SelectSC>
          <ErrorMessage>{fields.actType?.errorText()}</ErrorMessage>
        </Form.Item>
      </FieldsWrapper>
      <DocumentsUploadContainer
        documents={documents}
        uniqId="edit-apartment-act-form"
        onChange={(files) => {
          setDocuments(files);
          if (files.length === 0) {
            return fields.documentId?.onChange(null);
          }
          fields.documentId?.onChange(files[0]?.id);
        }}
        max={1}
        type={EDocumentType.Common}
      />
    </Form>
  );
};
