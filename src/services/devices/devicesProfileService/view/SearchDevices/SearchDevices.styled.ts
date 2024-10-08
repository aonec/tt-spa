import styled from 'styled-components';
import { Slider } from 'antd';
export { StyledForm } from '../DevicesProfile/DevicesProfile.styled';

export const Wrapper = styled.div`
  box-shadow: unset;
  margin-top: 15px;
`;

export const StyledGrid = styled.div<{ isExtendedSearchOpen: boolean }>`
  display: grid;
  grid-template-columns: ${({ isExtendedSearchOpen }) =>
    isExtendedSearchOpen ? '1fr' : '30px 8fr 3.5fr 1fr'};
  gap: 15px;
`;

export const SCSlider = styled(Slider)`
  width: 70%;
  &.ant-slider.ant-slider-with-marks {
    margin-bottom: 12px !important;
  }
`;

export const StyledLabel = styled.label`
  width: 30%;
  min-width: 150px;
  display: block;
  text-align: center;
  margin-right: 8px;
`;

export const StyledLabelSimple = styled.label`
  margin-right: 15px;
  white-space: nowrap;
`;

export const FlexCenterRow = styled.div`
  display: flex;
  align-items: center;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 10px;
`;

export const StyledExpirationDate = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;
