import { EOrganizationUserWorkingStatusType } from 'api/myApi';
import styled from 'styled-components';

const staffStatusColors = {
  Working: '#17B45A',
  OnVacation: '#FF8A1F',
  Sick: '#FC525B',
  OnDuty: '#3741c2',
};

export const Point = styled.div<{
  status: EOrganizationUserWorkingStatusType | null;
}>`
  margin-left: 5px;
  width: 6px;
  min-height: 6px;
  border-radius: 50%;
  background-color: ${({ status }) =>
    status ? staffStatusColors[status] : 'none'};
  margin-right: 15px;
`;

export const Flex = styled.div`
  display: flex;
  align-items: center;
`;
