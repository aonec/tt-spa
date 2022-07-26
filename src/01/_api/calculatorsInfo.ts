import { axios } from "../../api/axios";
import {
  CalculatorInfoListResponse,
  CalculatorInfoListWrappedResponse,
} from "../../api/types";

export const getCalculatorInfos = async (): Promise<
  CalculatorInfoListResponse[] | null
> => {
  const res: CalculatorInfoListWrappedResponse = await axios.get(
    "CalculatorInfos"
  );

  return res.items;
};
