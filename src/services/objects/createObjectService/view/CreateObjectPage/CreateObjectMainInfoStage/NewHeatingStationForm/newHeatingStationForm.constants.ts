import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  heatingStationType: yup.string().required('Обязательное поле'),
  heatingStationNumber: yup.string().required('Обязательное поле'),
});

export enum HeatingStation {  }
