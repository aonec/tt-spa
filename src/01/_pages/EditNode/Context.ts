import { createContext, Dispatch, SetStateAction } from 'react';
import { PipeNodeResponse } from '../../../myApi';

export interface EditNodeContextInterface {
  some?: string;
  visibleAddDevice?: boolean;
  setVisibleAddDevice?: Dispatch<SetStateAction<boolean>>;
  node?: PipeNodeResponse;
}

export const EditNodeContext = createContext<EditNodeContextInterface>({});
