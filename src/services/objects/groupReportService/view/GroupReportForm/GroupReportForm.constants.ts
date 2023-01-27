import { EEmailSubscriptionType, EReportType, EResourceType } from 'myApi';
import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  Name: Yup.string().required('Это поле обязательное'),
  From: Yup.string().required('Это поле обязательное'),
  To: Yup.string().required('Это поле обязательное'),
  HouseManagementId: Yup.string().required('Это поле обязательное'),
  ReportType: Yup.mixed<EReportType>()
    .oneOf(Object.values(EReportType))
    .required('Это поле обязательное'),
  NodeResourceTypes: Yup.array<EResourceType>(
    Yup.mixed<EResourceType>().oneOf(Object.values(EResourceType)),
  ).required('Это поле обязательное'),

  DelayedEmailTarget: Yup.string(),

  'Subscription.Email': Yup.string().email(),
  'Subscription.TriggerAt': Yup.string(),
  'Subscription.Type': Yup.mixed<EEmailSubscriptionType>().oneOf(
    Object.values(EEmailSubscriptionType),
  ),
  'Subscription.ContractorIds': Yup.array(Yup.number()),
});

export const ReportFormatRadioOptions = [
  { value: EReportType.Hourly, label: 'Часовая' },
  { value: EReportType.Daily, label: 'Суточная' },
];
