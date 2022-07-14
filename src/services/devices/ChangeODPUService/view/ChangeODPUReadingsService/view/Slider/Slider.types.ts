export type SliderProps = {
  values: {
    text: string;
    id: number | string | null;
    [key: string]: string | number | null;
  }[];
  onChange: (payload: OnChangePayload) => void;
  inputType?: 'number' | 'text';
  colors: string[];
  fields?: string[];
  titles?: string[];
};

type OnChangePayload = {
  id: string | number;
  values: {
    [key: string]: string;
  };
};
