import dayjs from 'api/dayjs';
import { EResourceType } from 'api/types';
import * as Yup from 'yup';

export const formInitialValues = {
  ReportName: 'Отчёт_по_СОИ',
  HouseManagementId: null as string | null,
  HousingStockIdHash: null as string | null,
  Resource: null as EResourceType | null,
  Period: 'month' as 'year' | 'month',
  NormativePerPerson: '',
  Date: dayjs() as dayjs.Dayjs | null,
};

export const validationSchema = Yup.object().shape({
  ReportName: Yup.string().required('Это поле обязательное'),
  NormativePerPerson: Yup.string().required('Это поле обязательное'),
});
