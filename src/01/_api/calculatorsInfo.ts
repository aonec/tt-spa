import axios from '01/axios';
import {
  CalculatorInfoListResponse,
  CalculatorInfoListWrappedResponse,
} from 'myApi';

export const getCalculatorInfos = async (): Promise<
  CalculatorInfoListResponse[] | null
> => {
  const res: CalculatorInfoListWrappedResponse = await axios.get(
    'CalculatorInfos'
  );

  return res.items;
};
