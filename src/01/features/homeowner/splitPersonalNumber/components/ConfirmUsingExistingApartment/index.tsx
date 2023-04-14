import { Flex } from '01/shared/ui/Layout/Flex';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { ModalTT } from '01/shared/ui/ModalTT';
import { Tooltip } from 'antd';
import { useStore } from 'effector-react';
import React from 'react';
import styled from 'styled-components';
import { getApartmentAddressString } from 'utils/getApartmentAddress';
import {
  $isConfirmExistingApartmentModalOpen,
  closeConfirmExistingApartmentModal,
  splitPersonalNumber,
  splitPersonalNumberFx,
} from '../../models';
import { renderDevice } from '../TransferDevices';
import { confirmUsingExistingApartmentService } from './ConfirmUsingExistingApartmenService.model';
import { PersonalNumber } from './ConfirmUsingExistingApartmentModal.styled';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';

const { outputs } = confirmUsingExistingApartmentService;

export const ConfirmUsingExistingApartmentModal = () => {
  const show = useStore($isConfirmExistingApartmentModalOpen);
  const apartment = useStore(outputs.$apartment);
  const devices = useStore(outputs.$devices);

  const pendingDevices = useStore(outputs.$isDeviceLoading);

  const pendingApartment = useStore(outputs.$isApartmentLoading);

  const address = apartment && getApartmentAddressString(apartment);

  const pending = pendingApartment || pendingDevices;

  function onSaveHandler() {
    splitPersonalNumber(true);
  }

  const pendingSplitRequest = useStore(splitPersonalNumberFx.pending);

  const getLinkOnApartmentProfile = () =>
    apartment ? `/apartments/${apartment?.id}` : '';

  const isApartmentHasDevices = Boolean(devices?.length);
  const hasApartmentHomeowners = Boolean(apartment?.homeownerAccounts);

  return (
    <>
      <ModalTT
        title={'Разделение лицевого счета'}
        visible={show}
        onCancel={closeConfirmExistingApartmentModal}
        disabled={isApartmentHasDevices || pending || hasApartmentHomeowners}
        onSubmit={onSaveHandler}
        loading={pendingSplitRequest}
      >
        <WithLoader isLoading={pending}>
          <div style={{ color: 'gray', fontSize: 16 }}>
            Квартира по адресу{' '}
            <Link href={getLinkOnApartmentProfile()} target="blank">
              {address}
            </Link>{' '}
            {`уже существует, ${
              isApartmentHasDevices || hasApartmentHomeowners
                ? 'но вы не можете ее использовать, так как на ней есть приборы или незакрытые лицевые счета'
                : 'вы хотите использовать ее?'
            }`}
          </div>
          {hasApartmentHomeowners && (
            <>
              <Space />
              <Flex>
                {apartment?.homeownerAccounts?.map((elem) => (
                  <Tooltip title={`${elem.name}, ${elem.phoneNumber}`}>
                    <PersonalNumber>
                      {elem.personalAccountNumber}
                    </PersonalNumber>
                  </Tooltip>
                ))}
              </Flex>
            </>
          )}
          <Space />
          {devices?.map(renderDevice)}
        </WithLoader>
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
