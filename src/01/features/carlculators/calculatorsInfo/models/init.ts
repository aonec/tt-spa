import { getCalculatorInfos } from '01/_api/calculatorsInfo';
import { forward } from 'effector';
import {
  $calculatorTypes,
  CalculatorInfosGate,
  fetchCalculatorTypesFx,
} from '.';

fetchCalculatorTypesFx.use(getCalculatorInfos);

$calculatorTypes
  .on(fetchCalculatorTypesFx.doneData, (_, data) => data)
  .reset(CalculatorInfosGate.close);

forward({
  from: CalculatorInfosGate.open,
  to: fetchCalculatorTypesFx,
});
