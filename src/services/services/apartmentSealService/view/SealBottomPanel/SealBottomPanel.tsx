import React, { FC } from 'react';
import { Panel, Wrapper } from './SealBottomPanel.styled';
import { SealBottomPanelProps } from './SealBottomPanel.types';
import { Button } from 'ui-kit/Button';
import { useHistory } from 'react-router-dom';

export const SealBottomPanel: FC<SealBottomPanelProps> = ({
  apartment,
  openCreateSealAppointmentModal,
  isAppointmentExist,
}) => {
  const history = useHistory();

  return (
    <Wrapper>
      <Panel id="bottomPanel">
        <Button
          type="ghost"
          size="small"
          onClick={() => history.push(`/apartments/${apartment.id}`)}
        >
          Перейти в профиль квартиры
        </Button>
        <Button
          onClick={openCreateSealAppointmentModal}
          size="small"
          type={isAppointmentExist ? 'ghost' : 'primary'}
        >
          {isAppointmentExist
            ? 'Редактировать запись'
            : 'Записать на опломбировку'}
        </Button>
      </Panel>
    </Wrapper>
  );
};
