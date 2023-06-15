import React, { FC } from 'react';
import { AddIndividualDevicePageProps } from './AddIndividualDevicePage.types';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { Link, useHistory } from 'react-router-dom';

import { Address, FlexContainer, Title } from './AddIndividualDevicePage.styled';
import { getApartmentAddressString } from 'utils/getApartmentAddress';
import { Button } from 'ui-kit/Button';

export const AddIndividualDevicePage: FC<AddIndividualDevicePageProps> = ({
  handleGoFirstStage,
  handleGoSecondStage,
  stageNumber,
  apartment,
}) => {
  const history = useHistory();

  const address =
    apartment && getApartmentAddressString(apartment, true);

  return (
    <>
      <GoBack />
      <Title>Добавление нового прибора</Title>
      <Address>
        <Link to={`/apartments/${apartment?.id}`}>{address}</Link>
      </Address>

      <FlexContainer>
        <Button type="ghost" onClick={history.goBack}>
          {stageNumber === 1 && 'Отмена'}
          {stageNumber === 2 && 'Назад'}
        </Button>
        <Button>
          {stageNumber === 1 && 'Далее'}
          {stageNumber === 2 && 'Сохранить изменения'}
        </Button>
      </FlexContainer>
    </>
  );
};
