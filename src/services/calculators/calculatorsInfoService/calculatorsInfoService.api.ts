import { axios } from 'api/axios';
import { CalculatorInfoListResponse } from 'api/types';

export const getCalculatorInfos = async (): Promise<
  CalculatorInfoListResponse[] | null
> => {
  const res: { items: CalculatorInfoListResponse[] } = await axios.get(
    'CalculatorInfos',
  );

  return res.items;
};
