import {
  EReportType,
  EResourceType,
  GroupReportConfigurationPeriod,
} from 'api/types';
import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  FileName: Yup.string().required('Это поле обязательное'),
  From: Yup.string().required('Это поле обязательное'),
  To: Yup.string().required('Это поле обязательное'),
  HouseManagementId: Yup.string().nullable(),
  ReportType: Yup.mixed<EReportType>()
    .oneOf(Object.values(EReportType))
    .required('Это поле обязательное'),
  NodeResourceTypes: Yup.array(
    Yup.mixed<EResourceType>().oneOf(Object.values(EResourceType)),
  ).required('Это поле обязательное'),

  DelayedEmailTarget: Yup.string(),

  isRegular: Yup.bool(),
  'Subscription.Email': Yup.string().when('isRegular', {
    is: true,
    then: (schema) =>
      schema.required('Это поле обязательное').email('Корректно введите Email'),
  }),
  'Subscription.TriggerAt': Yup.string(),
  'Subscription.Type': Yup.mixed<GroupReportConfigurationPeriod>().oneOf(
    Object.values(GroupReportConfigurationPeriod),
  ),
  'Subscription.ContractorIds': Yup.array(Yup.number()),
});

export const ReportFormatRadioOptions = [
  { value: EReportType.Hourly, label: 'Часовая' },
  { value: EReportType.Daily, label: 'Суточная' },
];
