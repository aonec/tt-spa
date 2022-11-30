import { PageHeader } from '01/shared/ui/PageHeader';
import { Steps } from 'antd';
import React, { FC } from 'react';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';
import { Title } from 'ui-kit/Title';
import { getHousingStockAddress } from 'utils/getHousingStockAddress';
import { AddressWrapper, Wrapper } from './CreateNodePage.styled';
import { CreateNodePageProps } from './CreateNodePage.types';
import { MountAddress } from './MountAddress';

const { Step } = Steps;

export const CreateNodePage: FC<CreateNodePageProps> = ({
  housingStock,
  existingCities,
  isLoadingHousingStock,
  existingStreets,
}) => {
  return (
    <div>
      <GoBack />
      <PageHeader title="Добавление нового узла" isTopMargin isGhost />
      {housingStock && (
        <AddressWrapper>
          {getHousingStockAddress(housingStock, true)}
        </AddressWrapper>
      )}
      <Wrapper>
        <div>
          <WithLoader isLoading={isLoadingHousingStock}>
            <MountAddress
              housingStock={housingStock}
              existingCities={existingCities}
              existingStreets={existingStreets}
              handleSubmit={console.log}
            />
          </WithLoader>
        </div>
        <div>
          <Title>Этапы создания</Title>
          <Steps direction="vertical" current={0}>
            <Step title="Адрес установки" />
            <Step title="Настройки соединения" />
            <Step title="Общие данные об узле" />
            <Step title="Подключенные приборы" />
          </Steps>
        </div>
      </Wrapper>
    </div>
  );
};
