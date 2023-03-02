import { pipeValidationSchema } from 'services/nodes/createNodeService/view/CreateNodePage/CommonData/CommonData.constants';
import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  communicationPipes: Yup.array().of(pipeValidationSchema),
});
