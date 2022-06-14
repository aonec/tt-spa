import { FilesUpload } from '01/shared/ui/FilesUpload';
import { Select } from '01/shared/ui/Select';
import { DatePickerTT, InputTT } from '01/tt-components';
import { Form } from 'antd';
import { useFormik } from 'formik';
import { DocumentResponse, EActResourceType, EActType } from 'myApi';
import React, { FC, SyntheticEvent, useEffect, useMemo, useState } from 'react';
import { actResourceTypes } from 'services/apartments/createApartmentActService/view/ApartmentActForm/ApartmentActForm.types';
import { EditActFormPayload } from '../../editApartmentActService.types';
import { ErrorMessage, FieldsWrapper } from './EditApartmentActForm.styled';
import { EditApartmentActFormProps } from './EditApartmentActForm.types';
import * as yup from 'yup';
import moment from 'moment';
import { ResourceInfo } from 'ui-kit/shared_components/ResourceInfo';
import { FileData } from '01/hooks/useFilesUpload';
import { FilesList } from '01/shared/ui/FilesList';

export const EditApartmentActForm: FC<EditApartmentActFormProps> = ({
  actTypes,
  formId,
  handleSubmit,
  initialValues,
}) => {
  const {
    values,
    setFieldValue,
    handleSubmit: submitForm,
    errors,
  } = useFormik<EditActFormPayload>({
    initialValues: {
      actJobDate: initialValues?.actJobDate,
      registryNumber: initialValues?.registryNumber,
      actResourceType: initialValues?.actResourceType,
      actType: initialValues?.actType,
      documentId: initialValues?.document?.id,
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

  const [files, setFiles] = useState<FileData[] | null>(null);

  

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
          <Select
            placeholder="Выберите"
            value={values.actType || undefined}
            onChange={(value) => setFieldValue('actType', value as EActType)}
            style={{ maxWidth: 172, overflow: 'hidden' }}
          >
            {actTypes?.map(({ key, value }) => (
              <Select.Option value={key!} key={key}>
                {value}
              </Select.Option>
            ))}
          </Select>
          <ErrorMessage>{errors.actType}</ErrorMessage>
        </Form.Item>
      </FieldsWrapper>

      <FilesUpload
        onChange={setFiles}
        filesInit={files}
        text="Добавьте акт допуска"
        uniqId="apartment-acts"
        max={1}
      />
    </Form>
  );
};
