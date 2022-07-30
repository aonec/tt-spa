import { axios } from "../../../../api/axios";
import { InspectorResponse } from "../../../../api/types";

export const getInspectors = (): Promise<InspectorResponse[] | null> =>
  axios.get('Inspectors');
