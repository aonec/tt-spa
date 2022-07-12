import { EResourceType } from 'myApi';

export type SliderProps = {
  values: {
    text: string;
    id: number | string | null;
    value: string | number | null;
  }[];
  onChange: (payload: OnChangePayload) => void;
  resource?: EResourceType;
  inputType?: 'number' | 'text';
};

type OnChangePayload = {
  value: string;
  id: string | number;
};
