export type Props = {
  formId: string;
  values: {
    name: null;
  };
  handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
  setFieldValue: (
    field: string,
    value: string,
    shouldValidate?: boolean,
  ) => void;
};
