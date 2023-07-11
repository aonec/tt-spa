import { message } from 'antd';
import { createReading } from '../../../../../../../01/_api/readings';
import { createReadingFx, readingFieldButtonClicked } from './index';
import { forward } from 'effector';

createReadingFx.use(createReading);

forward({
  from: readingFieldButtonClicked,
  to: createReadingFx,
});

createReadingFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});
