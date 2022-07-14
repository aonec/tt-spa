export type SliderProps = {
  values: {
    text: string;
    id: number | string | null;
    [key: string]: string | number | null;
  }[];
  onChange: (payload: OnChangePayload) => void;
  inputs: InputConfiguration[];
};

type OnChangePayload = {
  id: string | number;
  values: {
    [key: string]: string;
  };
};

type InputConfiguration = {
  color: string;
  field: string;
  inputType: 'string' | 'number';
  title?: string;
};
