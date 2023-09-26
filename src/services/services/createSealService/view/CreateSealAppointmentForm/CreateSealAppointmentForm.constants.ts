import { DigitCountTextList } from 'utils/getCountText';
import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  homeownerFullName: yup.string().required('Это поле обязательно'),
  homeownerPhone: yup.string().required('Это поле обязательно'),
  date: yup.string().required('Это поле обязательно'),
  sealCountPlan: yup.number().required('Это поле обязательно'),
});

export const appointmentsText: DigitCountTextList = [
  {
    digits: [0, 5, 6, 7, 8, 9, 11, 12, 13, 14],
    text: 'записи',
  },
  {
    digits: [1],
    text: 'запись',
  },
  {
    digits: [2, 3, 4],
    text: 'записей',
  },
];
