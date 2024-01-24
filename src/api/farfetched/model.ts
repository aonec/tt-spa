import { createEvent, createStore } from 'effector';
import { message, notification } from 'antd';
import {
  HttpError,
  JsonApiRequestError,
  isHttpError,
  isHttpErrorCode,
  isNetworkError,
} from '@farfetched/core';
import { sample } from 'effector';
import { forbiddenList } from 'utils/403handling';
import { tokensService } from 'api/tokensService';
import { OperationFailDataError } from './types';

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

const errorLogger = createEvent<string>();
errorLogger.watch((text) => message.error(text));

export const requestFailed = createEvent<{
  error: JsonApiRequestError;
  errorConverter?: (error: HttpError) => string;
  url: string;
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'GET';
}>();

sample({
  source: $isOnline,
  clock: requestFailed,
  filter: (isOnline, { error }) => isNetworkError({ error }) && isOnline,
  target: [setIsOffline, networkError],
});

sample({
  clock: requestFailed,
  filter: ({ error }) => !isNetworkError({ error }),
  target: setIsOnline,
});

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
  clock: requestFailed,
  filter: ({ error }) =>
    isHttpError({ error }) &&
    !isHttpErrorCode(401)({ error }) &&
    !isHttpErrorCode(403)({ error }),
  fn: ({ error, errorConverter }) => {
    const httpError = error as HttpError;
    if (errorConverter) {
      return errorConverter(httpError);
    }

    const result = (httpError.response as OperationFailDataError).error;
    return result.Text || result.Message || 'Произошла ошибка';
  },
  target: errorLogger,
});
