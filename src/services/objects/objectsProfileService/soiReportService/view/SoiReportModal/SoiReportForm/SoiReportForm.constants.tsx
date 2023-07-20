import moment from 'moment';
import { EResourceType } from 'api/myApi';
import * as Yup from 'yup';

export const formInitialValues = {
  ReportName: 'Отчёт_по_СОИ',
  HouseManagementId: null as string | null,
  HousingStockId: null as number | null,
  Resource: null as EResourceType | null,
  Period: 'month' as 'year' | 'month',
  NormativePerPerson: '',
  Date: moment() as moment.Moment | null,
};

export const validationSchema = Yup.object().shape({
  ReportName: Yup.string().required('Это поле обязательное'),
  NormativePerPerson: Yup.string().required('Это поле обязательное'),
});
