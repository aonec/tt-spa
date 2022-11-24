export type CreateNewHeatingPointFormProps = {
  setCreateModalOpen: (payload: boolean) => void;
  setNewHeatingPointModalData: (payload: HeatingPoint) => void;
  formId: string;
};

export type HeatingPoint = {
  heatingPoint: { heatingPointType: string; heatingPointNumber: string };
};
