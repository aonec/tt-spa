import moment from 'moment';
import React, { FC } from 'react';
import {
  InfoWrapper,
  LinkSC,
  RowWrapper,
  TaskBaseInfoWrapper,
  TitleWrapper,
} from './TaskBaseInfo.styled';
import { TaskBaseInfoProps } from './TaskBaseInfo.types';

export const TaskBaseInfo: FC<TaskBaseInfoProps> = ({ task }) => {
  const {
    id,
    address,
    creationTime,
    apartment,
    creationReason,
    perpetrator,
  } = task;

  const apartmentId = apartment?.id;
  const housingStockId = task.housingStockId;
  const apartmentComment = apartment?.comment || '';

  const linkPath = apartment
    ? `/objects/${housingStockId}/apartments/${apartmentId}`
    : `/objects/${housingStockId}`;

  const preparedCreationTime = moment(creationTime).format('DD.MM.YYYY HH:MM');

  return (
    <TaskBaseInfoWrapper>
      <TitleWrapper>Информация о задаче</TitleWrapper>
      <InfoWrapper>
        <RowWrapper>
          <div>Причина задачи</div>
          <div>{creationReason}</div>
        </RowWrapper>
        <RowWrapper>
          <div>Номер задачи</div>
          <div>{id}</div>
        </RowWrapper>
        <RowWrapper>
          <div>Дата создания</div>
          <div>{preparedCreationTime}</div>
        </RowWrapper>
        <RowWrapper>
          <div>Адрес</div>
          <LinkSC to={linkPath}>{address}</LinkSC>
        </RowWrapper>
        {apartment && (
          <RowWrapper>
            <div>Комментарии к квартире</div>
            <div>{apartmentComment}</div>
          </RowWrapper>
        )}
        {perpetrator && (
          <RowWrapper>
            <div>Исполнитель</div>
            <div>{perpetrator.name}</div>
          </RowWrapper>
        )}
      </InfoWrapper>
    </TaskBaseInfoWrapper>
  );
};
