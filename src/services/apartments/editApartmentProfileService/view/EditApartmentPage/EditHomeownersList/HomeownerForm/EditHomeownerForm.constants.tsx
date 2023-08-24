import dayjs from 'api/dayjs';
import { EPersonType } from 'api/types';
import * as Yup from 'yup';

export const formInitialValues = {
  personalAccountNumber: '',
  name: '',
  phoneNumber: '',
  paymentCode: '',
  personType: null as null | EPersonType,
  openAt: null as null | dayjs.Dayjs,
  isMainOnApartment: false,
};

export const validationSchema = Yup.object().shape({
  personalAccountNumber: Yup.string().required('Это поле обязательное'),
  name: Yup.string().required('Это поле обязательное'),
  paymentCode: Yup.string().required('Это поле обязательное'),
  openAt: Yup.date().required('Это поле обязательное').nullable(),
});
