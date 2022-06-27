import styled from 'styled-components';
import { Form, Slider } from 'antd';
export { StyledForm } from '../DevicesProfile/DevicesProfile.styled';

export const Wrapper = styled.div`
  box-shadow: unset;
`;

export const StyledGrid = styled.div<{ isExtendedSearchOpen: boolean }>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.isExtendedSearchOpen ? '1fr' : '0.1fr 8fr 3.5fr'};
  gap: 15px;
`;

export const CustomGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 5px;
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
  min-width: 165px;
  margin-right: 8px;
  text-align: right;
`

export const FlexCenterRow = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 8px;
  align-items: center;
  gap: 10px;
`

export const StyledExpirationDate = styled.div`
  display: flex;
  align-items: center;
`;