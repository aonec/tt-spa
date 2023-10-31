import { AddressSearchContainer } from 'services/addressSearchService';
import styled from 'styled-components';

export const ContentWrapper = styled.div`
  margin-top: 16px;
`;

export const AppointmentTextWrapper = styled.div`
  background-color: #272f5a;
  padding: 8px 16px;
  border-radius: 4px;
  color: white;

  display: flex;
  align-items: center;
`;

export const AddressSearchContainerSC = styled(AddressSearchContainer)`
  margin-top: 16px;
`;

export const AdditionalInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const AlertWrapper = styled.div`
  margin-top: 24px;
`;
