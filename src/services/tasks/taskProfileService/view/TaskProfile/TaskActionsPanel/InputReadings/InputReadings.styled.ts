import { getResourceColor } from 'services/meters/metersService/ApartmentReadingsService/view/ApartmentsReadings/DevicesSearch/DeviceDataString';
import { EResourceType } from 'api/types';
import styled from 'styled-components';

export const MonthWrapper = styled.div`
  font-weight: 400;
  color: #272f5ae5;
  margin-bottom: 5px;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ReadingValuesWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const ReadingInputSC = styled.input<{
  resource: EResourceType;
  index?: number;
}>`
  margin-bottom: 15px;
  padding: 7px 12px;
  border: 1px solid
    ${({ resource, index }) => getResourceColor(resource, index)};
  border-left: 4px solid
    ${({ resource, index }) => getResourceColor(resource, index)};
  border-radius: 4px;
  padding: 4px 10px;
  width: 180px;
  transition: 0.2s;

  &:disabled {
    background: rgba(0, 0, 0, 0.08);
  }

  &:focus,
  &:hover {
    box-shadow: 0 5px 10px #00001522;
  }
`;
