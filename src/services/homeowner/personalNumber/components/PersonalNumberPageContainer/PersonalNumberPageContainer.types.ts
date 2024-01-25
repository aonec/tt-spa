import { ApartmentResponse } from 'api/types';
import { ReactNode } from 'react';

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
  children?: ReactNode;
};
