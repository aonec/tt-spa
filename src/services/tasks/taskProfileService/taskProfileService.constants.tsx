import { EManagingFirmTaskType } from 'api/myApi';
import * as yup from 'yup';

export const completionLabelsDictionary: { [key: string]: string } = {
  [EManagingFirmTaskType.PipeRupture]: 'Подтверждение порыва',
};

export const pushStagePayloadValidationsArray = [
  {
    taskType: EManagingFirmTaskType.PipeRupture,
    schema: yup.object().shape({
      taskConfirmation: yup.object().shape({
        type: yup
          .string()
          .required(
            `Поле "${
              completionLabelsDictionary[EManagingFirmTaskType.PipeRupture]
            }" обязательное`,
          ),
        comment: yup.string().when('type', {
          is: (value) => Boolean(value),
          then: yup.string().required(`Поле "Комментарий" обязательно`),
        }),
      }),
    }),
  },
];
