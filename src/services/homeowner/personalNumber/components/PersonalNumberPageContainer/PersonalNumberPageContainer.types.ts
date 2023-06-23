import { ApartmentResponse } from 'myApi';

export type PersonalNumberPageContainerProps = {
  isLoading?: boolean;
  titleText: string;
  formId: string;
  apartment?: ApartmentResponse | null;
  onCancelHandler?(): void;
  isFirstStage?: boolean;
  isLastStage?: boolean;
  handleCheckApartmentExist?: () => void;
  isCheckApartLoading?: boolean;
};
