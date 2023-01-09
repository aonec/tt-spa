import styled from 'styled-components';
import { apartmentIndividualDeviceMetersInputLineGridTemplate } from 'services/meters/individualDeviceMetersInputService/view/ApartmentIndividualDeviceMetersInputLine/ApartmentIndividualDeviceMetersInputLine.styled';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: ${apartmentIndividualDeviceMetersInputLineGridTemplate};
  grid-gap: 16px;
  background: rgba(39, 47, 90, 0.04);
  border-bottom: 1px solid #dcdee4;
  align-items: center;
  height: 48px;
  padding: 0 16px;
  color: rgba(39, 47, 90, 0.9); ;
`;

export const MonthSliderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .right-chevron {
    transform: rotate(180deg);
  }
`;

export const ArrowContainer = styled.div<{ isDisabled: boolean }>`
  min-width: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  ${({ isDisabled }) => !isDisabled && 'cursor: pointer;'}

  svg path {
    opacity: ${({ isDisabled }) => (isDisabled ? 0.4 : 1)};
  }

  &:hover {
    svg path {
      transition: 0.2s;
      ${({ isDisabled }) => (isDisabled ? '' : 'fill: #189EE9 !important;')}
    }
  }
`;

export const CurrentMonth = styled.div`
  text-align: center;
`;
