import moment from 'moment';
import { PersonType } from 'myApi';
import * as Yup from 'yup';

export const formInitialValues = {
  personalAccountNumber: '',
  name: '',
  phoneNumber: '',
  paymentCode: '',
  personType: null as null | PersonType,
  openAt: null as null | moment.Moment,
  isMainOnApartment: false,
};

export const validationSchema = Yup.object().shape({
  personalAccountNumber: Yup.string().required('Это поле обязательное'),
  name: Yup.string().required('Это поле обязательное'),
  phoneNumber: Yup.string().required('Это поле обязательное'),
  paymentCode: Yup.string().required('Это поле обязательное'),
});
