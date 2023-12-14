import React, { FC } from 'react';
import { Panel, Wrapper } from './SealBottomPanel.styled';
import { SealBottomPanelProps } from './SealBottomPanel.types';
import { Button } from 'ui-kit/Button';
import { useNavigate } from 'react-router-dom';

export const SealBottomPanel: FC<SealBottomPanelProps> = ({
  apartment,
  openCreateSealAppointmentModal,
  isAppointmentExist,
  openRemoveAppointmentModal,
}) => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Panel id="bottomPanel">
        <Button
          type="ghost"
          size="small"
          onClick={() => navigate(`/apartments/${apartment.id}`)}
        >
          Перейти в профиль квартиры
        </Button>
        {!isAppointmentExist && (
          <Button
            onClick={openCreateSealAppointmentModal}
            size="small"
            type={'primary'}
          >
            Записать на опломбировку
          </Button>
        )}
        {isAppointmentExist && (
          <>
            <Button
              onClick={openCreateSealAppointmentModal}
              size="small"
              type={'ghost'}
            >
              Редактировать запись
            </Button>
            <Button
              onClick={openRemoveAppointmentModal}
              size="small"
              type={'danger'}
            >
              Удалить запись
            </Button>
          </>
        )}
      </Panel>
    </Wrapper>
  );
};
