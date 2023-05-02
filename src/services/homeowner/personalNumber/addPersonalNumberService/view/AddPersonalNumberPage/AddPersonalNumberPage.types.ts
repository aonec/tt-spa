import { ApartmentResponse, HomeownerAccountCreateRequest } from 'myApi';

export type AddPersonalNumberPageProps = {
  apartment: ApartmentResponse | null;
  isLoading: boolean;
  handleAddPersonalNumber: (payload: HomeownerAccountCreateRequest) => void;
};
