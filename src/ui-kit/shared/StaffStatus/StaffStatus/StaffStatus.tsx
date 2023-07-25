import React, { FC } from 'react';
import { StaffStatusProps } from './StaffStatus.types';
import { Flex, Point } from './StaffStatus.styled';

const staffStatusText = {
  Working: 'Работает',
  OnVacation: 'В отпуске',
  Sick: 'Болеет',
  OnDuty: 'На дежурстве',
};

export const StaffStatus: FC<StaffStatusProps> = ({ status }) => {
  return (
    <Flex>
      <Point status={status} />
      {status ? staffStatusText[status] : 'Статус не указан'}
    </Flex>
  );
};
