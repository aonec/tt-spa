import { forward } from 'effector';
import {
  $calculatorTypes,
  CalculatorInfosGate,
  fetchCalculatorTypesFx,
} from '.';
import { getCalculatorInfos } from '../../../../_api/calculatorsInfo';

fetchCalculatorTypesFx.use(getCalculatorInfos);

$calculatorTypes
  .on(fetchCalculatorTypesFx.doneData, (_, data) => data)
  .reset(CalculatorInfosGate.close);

forward({
  from: CalculatorInfosGate.open,
  to: fetchCalculatorTypesFx,
});
