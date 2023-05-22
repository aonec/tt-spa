import { Document } from 'ui-kit/DocumentsService';
import { CreateCalculatorPayload } from '../CreateCalculatorModal.types';

export type CreateCalculatorModalFilesUploadFormProps = {
  formId: string;
  updatePayload: (payload: CreateCalculatorPayload) => void;
  initialValues: CreateCalculatorPayload;
};

export type CreateCalculatorFiles = {
  deviceAcceptanceAct?: Document;
  devicePassport?: Document;
  deviceTestCertificates?: Document;
};
