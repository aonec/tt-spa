import moment from 'moment';
import { PersonType } from 'myApi';

export const formInditialValues = {
  personalAccountNumber: '',
  name: '',
  phoneNumber: '',
  paymentCode: '',
  personType: null as null | PersonType,
  openAt: null as null | moment.Moment,
  isMainOnApartment: false,
};
