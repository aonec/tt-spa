import { apartmentIndividualDeviceMetersInputLineGridTemplate } from 'services/meters/individualDeviceMetersInputService/view/ApartmentIndividualDeviceMetersInputLine/ApartmentIndividualDeviceMetersInputLine.styled';
import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: ${apartmentIndividualDeviceMetersInputLineGridTemplate};

  grid-gap: 15px;
  color: var(--main-90);
  background-color: var(--main-4);
  border-bottom: 1px solid var(--frame);
  align-items: center;
  padding-left: 10px;
  height: 60px;

  font-size: 12px;
`;
