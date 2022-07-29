import React from 'react';
import styled from 'styled-components';
import { EOrganizationUserWorkingStatusType } from '../../../../../../../api/types';

interface Props {
  status: EOrganizationUserWorkingStatusType | null;
}

const staffStatusColors = {
  Working: '#17B45A',
  OnVacation: '#FF8A1F',
  Sick: '#FC525B',
  OnDuty: '#3741c2',
};

const staffStatusText = {
  Working: 'Работает',
  OnVacation: 'В отпуске',
  Sick: 'Болеет',
  OnDuty: 'На дежурстве',
};

export const StaffStatus: React.FC<Props> = ({ status }) => {
  const Point = styled.div`
    margin-left: 5px;
    width: 6px;
    min-height: 6px;
    border-radius: 50%;
    background-color: ${status ? staffStatusColors[status] : 'none'};
    margin-right: 15px;
  `;

  const Flex = styled.div`
    display: flex;
    align-items: center;
  `;

  return (
    <Flex>
      <Point />
      {status ? staffStatusText[status] : 'Статус не указан'}
    </Flex>
  );
};
