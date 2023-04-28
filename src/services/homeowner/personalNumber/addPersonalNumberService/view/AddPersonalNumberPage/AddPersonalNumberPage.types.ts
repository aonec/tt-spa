import { ApartmentResponse, HomeownerAccountCreateRequest } from 'myApi';

export type AddPersonalNumberPageProps = {
  apartment: ApartmentResponse;
  isLoading: boolean;
  handleAddPersonalNumber: (payload: HomeownerAccountCreateRequest) => void;
};
