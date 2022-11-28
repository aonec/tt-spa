export type NewHeatingPointFormProps = {
  setCreateModalOpen?: (payload: boolean) => void;
  setEditModalOpen?: (payload: boolean) => void;
  setNewHeatingPointModalData: (payload: HeatingPoint) => void;
  formId: string;
};

export type HeatingPoint = {
  heatingPoint: { heatingPointType: string; heatingPointNumber: string };
};
