import { sample } from 'effector';
import { createGate } from 'effector-react';
import {
  addPhoneNumberMutation,
  homeownerAccountQuery,
  removePhoneNumberMutation,
} from './editHomeownerPhoneNumberService.api';
import { message } from 'antd';

const EditHomeownerAccountGate = createGate<{ id: string }>();

sample({
  clock: [
    EditHomeownerAccountGate.open,
    addPhoneNumberMutation.finished.success,
    removePhoneNumberMutation.finished.success,
  ],
  source: EditHomeownerAccountGate.state,
  fn: ({ id }) => id,
  target: homeownerAccountQuery.start,
});

addPhoneNumberMutation.finished.failure.watch(({ error }) =>
  message.error(error.response.data.error.Text),
);

addPhoneNumberMutation.finished.success.watch(() =>
  message.success('Номер успешно добавлен!'),
);

removePhoneNumberMutation.finished.success.watch(() => {
  message.success('Номер успешно удален!');
});

export const editHomeownerPhoneNumberService = {
  inputs: {},
  outputs: {},
  gates: { EditHomeownerAccountGate },
};
