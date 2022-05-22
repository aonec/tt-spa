import React from 'react';
import { FC } from 'react';
import { Header, Wrap, CreateButton } from './CheckHistory.styled';
import { CheckHistoryComponentProps } from './CheckHistory.types';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { ApartmentChecksDocuments } from '01/features/apartments/displayApartmentChecksHistory/models';
import { PendingLoader } from '01/shared/ui/PendingLoader';
import { CheckHistoryDocument } from './Components/CheckHistoryDocument';
import './models/init';

export const checkHistoryTemp = '0.7fr 0.6fr 0.5fr 0.5fr 2.5fr';

export const ChecksHistoryComponent: FC<CheckHistoryComponentProps> = (
  props
) => {
  const {
    apartmentId,
    documents,
    pending,
    openCheckApartmentModal,
    removeApartmentCheck,
    openEditApartmentCheckModal,
  } = props;

  return (
    <Wrap>
      <ApartmentChecksDocuments apartmentId={apartmentId} />
      <PendingLoader loading={pending}>
        <Header temp={checkHistoryTemp}>
          <div>Дата</div>
          <div>Тип</div>
          <div>№ акта</div>
          <div>Ресурс</div>
          <div>Заключение</div>
        </Header>
        {documents?.map((document) => (
          <CheckHistoryDocument
            document={document}
            removeApartmentCheck={removeApartmentCheck}
            openEditApartmentCheckModal={openEditApartmentCheckModal}
          />
        ))}
      </PendingLoader>
      <Space />
      <CreateButton
        className="ant-btn-link"
        onClick={() => openCheckApartmentModal()}
      >
        + Создать проверку
      </CreateButton>
    </Wrap>
  );
};
