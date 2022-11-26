import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  floors: yup.string(),
  entrances: yup.string(),
  elevator: yup.string(),
});
