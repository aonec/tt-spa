import styled from 'styled-components';
import { apartmentIndividualDeviceMetersInputLineGridTemplate } from 'services/meters/individualDeviceMetersInputService/view/ApartmentIndividualDeviceMetersInputLine/ApartmentIndividualDeviceMetersInputLine.styled';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: ${apartmentIndividualDeviceMetersInputLineGridTemplate};
  grid-gap: 16px;
  border-bottom: 1px solid #dcdee4;
  align-items: center;
  height: 48px;
  padding: 0 16px;
  color: rgba(39, 47, 90, 0.9);

  background-color: #f6f7f8;
  /* position: sticky; */
  top: 190px;
  z-index: 10;
`;

export const MonthSliderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ArrowContainer = styled.div<{
  isDisabled: boolean;
  isRight?: boolean;
}>`
  min-width: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  ${({ isRight }) => (isRight ? 'transform: rotate(180deg);' : '')}
  ${({ isDisabled }) => (!isDisabled ? 'cursor: pointer;' : '')}

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
