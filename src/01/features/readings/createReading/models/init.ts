import { createReading } from './../../../../_api/readings';
import { createReadingFx, readingFieldButtonClicked } from './index';
import { forward } from 'effector';

createReadingFx.use(createReading);

forward({
  from: readingFieldButtonClicked,
  to: createReadingFx,
});