import React, { FC } from 'react';
import { Tooltip } from 'antd';
import { ConfirmUsingExistingApartmentFormProps } from './ConfirmUsingExistingApartmentForm.types';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';
import { getApartmentAddressString } from 'utils/getApartmentAddress';
import { IndividualDeviceItem } from 'services/homeowner/personalNumber/splitPersonalNumberService/view/SplitPersonalNumberPage/stages/TransferDevicesStage/IndividualDeviceItem';
import {
  Description,
  FlexContainer,
  LinkSc,
  PersonalNumber,
} from './ConfirmUsingExistingApartmentForm.styled';

export const ConfirmUsingExistingApartmentForm: FC<
  ConfirmUsingExistingApartmentFormProps
> = ({
  apartment,
  devices,
  isPending,
  isApartmentHasDevices,
  isApartmentHasHomeowners,
}) => {
  const address = apartment && getApartmentAddressString(apartment);

  return (
    <WithLoader isLoading={isPending}>
      <Description>
        Квартира по адресу
        <LinkSc to={`/apartments/${apartment?.id}`} target="blank">
          {address}
        </LinkSc>{' '}
        {` уже существует, ${
          isApartmentHasDevices || isApartmentHasHomeowners
            ? 'но вы не можете ее использовать, так как на ней есть приборы или незакрытые лицевые счета'
            : 'вы хотите использовать ее?'
        }`}
      </Description>
      {isApartmentHasHomeowners && (
        <>
          <FlexContainer>
            {apartment?.homeownerAccounts?.map((elem) => (
              <Tooltip title={`${elem.name}, ${elem.phoneNumber}`}>
                <PersonalNumber>{elem.personalAccountNumber}</PersonalNumber>
              </Tooltip>
            ))}
          </FlexContainer>
        </>
      )}

      {devices?.map((device) => (
        <IndividualDeviceItem device={device} key={device.id} />
      ))}
    </WithLoader>
  );
};
