import { axios } from 'api/axios';
import { CalculatorInfoListResponse } from 'myApi';

export const getCalculatorInfos = async (): Promise<
  CalculatorInfoListResponse[] | null
> => {
  const res: { items: CalculatorInfoListResponse[] } = await axios.get(
    'CalculatorInfos',
  );

  return res.items;
};
