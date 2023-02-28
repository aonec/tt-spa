import React, { FC } from 'react';
import { EDocumentType } from 'myApi';
import { DocumentsUploadContainer } from 'ui-kit/DocumentsService';
import { DocumentsInputWrapper } from './FilesUploadsForm.styled';
import { useForm } from 'effector-forms/dist';
import { createCalcuatorService } from '../CreateCalculatorModal/models';

export const FilesUploadForm: FC = () => {
  const { fields } = useForm(createCalcuatorService.forms.documentsForm);

  return (
    <DocumentsInputWrapper>
      <DocumentsUploadContainer
        label="Добавьте акт выполненных работ"
        uniqId="one"
        max={1}
        documents={
          fields.deviceAcceptanceAct.value && [fields.deviceAcceptanceAct.value]
        }
        onChange={(documents) =>
          fields.deviceAcceptanceAct.onChange(documents[0] || null)
        }
        type={EDocumentType.DeviceAcceptanceAct}
      />
      <DocumentsUploadContainer
        uniqId="two"
        label="Добавьте паспорт прибора"
        max={1}
        documents={fields.devicePassport.value && [fields.devicePassport.value]}
        onChange={(documents) =>
          fields.devicePassport.onChange(documents[0] || null)
        }
        type={EDocumentType.DevicePassport}
      />
      <DocumentsUploadContainer
        uniqId="three"
        label="Добавьте свидетельство о поверке прибора"
        max={1}
        documents={
          fields.deviceTestCertificates.value && [
            fields.deviceTestCertificates.value,
          ]
        }
        onChange={(documents) =>
          fields.deviceTestCertificates.onChange(documents[0] || null)
        }
        type={EDocumentType.DeviceTestCertificates}
      />
    </DocumentsInputWrapper>
  );
};
