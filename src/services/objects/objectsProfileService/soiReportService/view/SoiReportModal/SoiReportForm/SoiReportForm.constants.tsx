import moment from 'moment';
import { EResourceType } from 'myApi';

export const formInitialValues = {
  ReportName: 'Отчёт_по_СОИ',
  HouseManagementId: null as string | null,
  HousingStockId: null as number | null,
  Resource: null as EResourceType | null,
  Period: 'month' as 'year' | 'month',
  NormativePerPerson: '',
  Date: null as moment.Moment | null,
};
