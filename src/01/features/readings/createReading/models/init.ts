import { message } from 'antd';
import { createReading } from './../../../../_api/readings';
import { createReadingFx, readingFieldButtonClicked } from './index';
import { forward } from 'effector';

createReadingFx.use(createReading);

forward({
  from: readingFieldButtonClicked,
  to: createReadingFx,
});

createReadingFx.failData.watch((error) => {
  if (error.response.status === 403) {
    return message.error(
      'У вашего аккаунта нет доступа к выбранному действию. Уточните свои права у Администратора',
    );
  }
  return message.error(
    error.response.data.error.Text || error.response.data.error.Message,
  );
});
