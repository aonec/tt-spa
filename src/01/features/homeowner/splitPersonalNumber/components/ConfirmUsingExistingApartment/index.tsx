import { getApartmentAddressString } from '01/features/homeowner/editPersonalNumber/components/PersonalNumberActionPage';
import { IndividualDevicesGate } from '01/features/individualDevices/displayIndividualDevices/models';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { ModalTT } from '01/shared/ui/ModalTT';
import { PendingLoader } from '01/shared/ui/PendingLoader';
import { getApartment } from '01/_api/apartments';
import { getIndividualDevices } from '01/_api/individualDevices';
import { useStore } from 'effector-react';
import { ApartmentResponse, IndividualDeviceListItemResponse } from 'myApi';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import {
  $checkedExistingApartmentId,
  $isConfirmExistingApartmentModalOpen,
  closeConfirmExistingApartmentModal,
  splitPersonalNumber,
  splitPersonalNumberFx,
} from '../../models';
import { renderDevice } from '../TransferDevices';

export const ConfirmUsingExistingApartmentModal = () => {
  const show = useStore($isConfirmExistingApartmentModalOpen);
  const id = useStore($checkedExistingApartmentId);

  const [devices, setDevices] = useState<
    IndividualDeviceListItemResponse[] | null
  >(null);
  const [pendingDevices, setPendingDevices] = useState(false);

  const [apartment, setApartment] = useState<ApartmentResponse | null>(null);
  const [pendingApartment, setPendingApartment] = useState(false);

  async function fetchApartment() {
    if (!id) return;
    setPendingApartment(true);

    try {
      const apartment = await getApartment(id);

      setApartment(apartment);
    } catch (error) {}

    setPendingApartment(false);
  }

  async function fetchDevices() {
    if (!id) return;
    setPendingDevices(true);
    try {
      const devices = await getIndividualDevices({ ApartmentId: id });

      setDevices(devices.items);
    } catch (error) {}
    setPendingDevices(false);
  }

  useEffect(() => {
    fetchApartment();
    fetchDevices();
  }, [id]);

  const address = apartment && getApartmentAddressString(apartment);

  const pending = pendingApartment || pendingDevices;

  function onSaveHandler() {
    splitPersonalNumber(true);
  }

  const pendingSplitRequest = useStore(splitPersonalNumberFx.pending);

  const history = useHistory();

  const getLinkOnApartmentProfile = () =>
    apartment
      ? `/objects/${apartment?.housingStock?.id}/apartments/${apartment?.id}`
      : '';

  const isApartmentHasDevices = Boolean(devices?.length);

  return (
    <>
      <ModalTT
        title={'Разделение лицевого счета'}
        visible={show}
        onCancel={closeConfirmExistingApartmentModal}
        disabled={isApartmentHasDevices || pending}
        onSubmit={onSaveHandler}
        loading={pendingSplitRequest}
      >
        <PendingLoader loading={pending}>
          <div style={{ color: 'gray', fontSize: 17 }}>
            Квартира по адресу{' '}
            <Link href={getLinkOnApartmentProfile()} target="blank">
              {address}
            </Link>{' '}
            {`уже существует, ${
              isApartmentHasDevices
                ? 'и на ней есть активные приборы, вы не можете ее использовать'
                : 'вы хотите использовать ее?'
            }`}
          </div>
          <Space />
          {devices?.map(renderDevice)}
        </PendingLoader>
      </ModalTT>
    </>
  );
};

const Link = styled.a`
  color: #22232b !important;
  cursor: pointer;
  &:hover {
    color: #189ee9 !important;
  }
`;
