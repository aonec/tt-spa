export type CustomInputProps = {
  configuration: InputConfiguration;
  onChange: (value: string) => void;
  value: string;
};

export type InputConfiguration = {
  color: string;
  inputType: string;
  title?: string;
};
