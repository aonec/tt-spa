import { createEvent, createStore } from 'effector';
import { message, notification } from 'antd';
import {
  JsonApiRequestError,
  isHttpErrorCode,
  isNetworkError,
} from '@farfetched/core';
import { sample } from 'effector';
import { forbiddenList } from 'utils/403handling';
import { tokensService } from 'api/tokensService';

const forbiddenUserError = createEvent();
forbiddenUserError.watch(() => {
  message.error(
    'У вашего аккаунта нет доступа к выбранному действию. Уточните свои права у Администратора',
  );
});

const setIsOffline = createEvent();
export const setIsOnline = createEvent();
const $isOnline = createStore(true)
  .on(setIsOffline, () => false)
  .on(setIsOnline, () => true);

const networkError = createEvent();
networkError.watch(() =>
  notification.error({
    description: 'Проверьте свое подключение к интернету',
    message: 'Ошибка связи',
  }),
);

export const requestFailed = createEvent<{
  error: JsonApiRequestError;
  url: string;
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'GET';
}>();

sample({
  clock: requestFailed,
  filter: isHttpErrorCode(401),
  target: tokensService.inputs.tokenExpired,
});

sample({
  clock: requestFailed,
  filter: ({ error, url, method }) => {
    return (
      forbiddenList.some(
        (forbiddenUrl) =>
          forbiddenUrl.methods.includes(method) &&
          forbiddenUrl.regExp.test(url),
      ) && isHttpErrorCode(403)({ error })
    );
  },
  target: forbiddenUserError,
});

sample({
  source: $isOnline,
  clock: requestFailed,
  filter: (isOnline, { error }) => isNetworkError({ error }) && isOnline,
  target: [setIsOffline, networkError],
});
