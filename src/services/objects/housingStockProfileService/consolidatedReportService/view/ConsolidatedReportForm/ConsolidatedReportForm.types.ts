import {
  BuildingListResponse,
  HousingStockResponse,
  NonResidentialBuildingResponse,
} from 'api/types';
import { GetConsolidatedReport } from '../../consolidatedReportService.types';
import moment from 'moment';

export type ConsolidatedReportFormProps = {
  formId: string;
  building:
    | HousingStockResponse
    | NonResidentialBuildingResponse
    | BuildingListResponse;
  handleSubmit: (payload: GetConsolidatedReport) => void;
};

export enum ArchiveType {
  StartOfMonth = 'StartOfMonth',
  PreviousMonth = 'PreviousMonth',
  AnyPeriod = 'AnyPeriod',
}

export type DatePeriod = [null | moment.Moment, null | moment.Moment];
