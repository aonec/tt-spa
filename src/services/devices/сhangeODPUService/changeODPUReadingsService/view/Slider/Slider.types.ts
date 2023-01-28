import { InputConfiguration } from "../CustomInput/CustomInput.types";

export type SliderProps = {
  values: {
    text: string;
    id: number | string | null;
    [key: string]: string | number | null;
  }[];
  onChange: (payload: OnChangePayload) => void;
  inputs: (InputConfiguration & {field: string})[];
};

type OnChangePayload = {
  id: string | number;
  values: {
    [key: string]: string;
  };
};


