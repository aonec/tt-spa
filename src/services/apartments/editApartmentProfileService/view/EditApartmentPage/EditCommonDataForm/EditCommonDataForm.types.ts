export type EditCommonDataFormProps = {
  isUpdatingApartmentLoading: boolean;
  initialValues: EditCommonDataForm;
  handleEditCommonData: (payload: EditCommonDataForm) => void;
};

export type EditCommonDataForm = {
  Square: number | null;
  NumberOfLiving: number | null;
  NormativeNumberOfLiving: number | null;
  ColdWaterRiserCount: number | null;
  HotWaterRiserCount: number | null;
};
