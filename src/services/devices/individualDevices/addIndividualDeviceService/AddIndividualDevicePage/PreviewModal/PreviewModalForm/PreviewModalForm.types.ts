import {
  CreateIndividualDeviceRequest,
  IndividualDeviceMountPlaceListResponse,
} from 'api/types';
import { DocumentStageForm } from '../../stages/DocumentsStage/DocumentsStage.types';
import { ReactNode } from 'react';

export type PreviewModalFormProps = {
  documents: DocumentStageForm | null;
  formData: CreateIndividualDeviceRequest | null;
  mountPlaces: IndividualDeviceMountPlaceListResponse[] | null;
};

export type ILine = {
  name: string;
  value: ReactNode;
};

export enum EIndividualDeviceDocumentType {
  DeviceAcceptanceAct = 'completedWorks',
  DevicePassport = 'devicePassport',
  DeviceTestCertificates = 'deviceCheck',
}
