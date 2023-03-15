import React, { FC, useMemo } from 'react';
import { StyledModal } from '01/shared/ui/Modal/Modal';
import { Header } from 'ui-kit/Modals/FormModal/FormModal.styled';
import {
  AddressText,
  AddressWrapper,
  CalculatorBaseInfo,
  CalculatorEntryNumber,
  CalculatorModel,
  CalculatorSerialNumber,
  CalculatorWrapper,
  Footer,
  NoCalculatorText,
  NodeResourceInfo,
  StepTitle,
  StepWrapper,
} from './CreateNodeConfirmationModal.styled';
import { CreateNodeConfirmationModalProps } from './CreateNodeConfirmationModal.types';
import { Button } from 'ui-kit/Button';
import { CalculatorIcon, CitySmallIcon } from 'ui-kit/icons';
import { getHousingStockAddress } from 'utils/getHousingStockAddress';
import { CommonInfo } from 'ui-kit/shared_components/CommonInfo';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { CommunicationPipeListItem } from '../CreateNodePage/ConnectedDevices/CommunicationPipeListItem';
import { Empty } from 'antd';
import { resourceFromConfig } from 'utils/resourceFromConfigLookup';
import { configNamesLookup } from 'utils/configNamesLookup';
import {
  NodeRegistrationTypeLookup,
  NodeStatusTextDictionary,
} from 'dictionaries';
import moment from 'moment';

export const CreateNodeConfirmationModal: FC<
  CreateNodeConfirmationModalProps
> = ({
  isOpen,
  handleClose,
  housingStock,
  calculator,
  requestPayload,
  serviceZone,
  isLoading,
  handleSubmitForm,
}) => {
  const commercialAccountingDatesString = useMemo(() => {
    if (
      !requestPayload.commercialStatusRequest?.startCommercialAccountingDate ||
      !requestPayload.commercialStatusRequest?.endCommercialAccountingDate
    ) {
      return '—';
    }

    const start = moment(
      requestPayload.commercialStatusRequest.startCommercialAccountingDate,
    );
    const end = moment(
      requestPayload.commercialStatusRequest.endCommercialAccountingDate,
    );

    return `${start.format('DD.MM.YYYY')} — ${end.format('DD.MM.YYYY')}`;
  }, [requestPayload.commercialStatusRequest]);

  return (
    <StyledModal
      centered
      visible={isOpen}
      onCancel={handleClose}
      width={800}
      footer={
        <Footer>
          <Button type="ghost" onClick={handleClose}>
            Отмена
          </Button>
          <Button isLoading={isLoading} long onClick={handleSubmitForm}>
            Создать узел
          </Button>
        </Footer>
      }
      title={<Header>Добавление нового узла</Header>}
    >
      <StepWrapper>
        <StepTitle>1. Адрес установки</StepTitle>
        <AddressWrapper>
          <CitySmallIcon />
          <AddressText>
            {getHousingStockAddress(housingStock, true)}
          </AddressText>
        </AddressWrapper>
      </StepWrapper>

      <StepWrapper>
        <StepTitle>2. Настройки соединения</StepTitle>
        <CalculatorWrapper>
          {calculator && (
            <>
              <CalculatorBaseInfo>
                <CalculatorIcon />
                <CalculatorSerialNumber>
                  {calculator.serialNumber}
                </CalculatorSerialNumber>
                <CalculatorModel>({calculator.model})</CalculatorModel>
              </CalculatorBaseInfo>
              <CalculatorEntryNumber>
                Ввод: {requestPayload.entryNumber}
              </CalculatorEntryNumber>
            </>
          )}
          {!calculator && (
            <NoCalculatorText>Нет подключенного вычислителя</NoCalculatorText>
          )}
        </CalculatorWrapper>
      </StepWrapper>

      <StepWrapper>
        <StepTitle>3. Общие данные об узле</StepTitle>
        <CommonInfo
          items={[
            {
              key: 'Конфигурация',
              value: requestPayload?.configuration && (
                <NodeResourceInfo>
                  <ResourceIconLookup
                    resource={resourceFromConfig[requestPayload.configuration]}
                  />
                  <div>{configNamesLookup[requestPayload.configuration]}</div>
                </NodeResourceInfo>
              ),
            },
            {
              key: 'Тип узла',
              value: requestPayload.registrationType
                ? NodeRegistrationTypeLookup[requestPayload.registrationType]
                : '',
            },
            { key: 'Номер узла', value: requestPayload.number },
            { key: 'Зона', value: serviceZone.name },
            {
              hidden: !requestPayload.commercialStatusRequest?.commercialStatus,
              key: 'Коммерческий учет показателей приборов',
              value: requestPayload.commercialStatusRequest?.commercialStatus
                ? NodeStatusTextDictionary[
                    requestPayload.commercialStatusRequest.commercialStatus
                  ]
                : '',
            },
            {
              key: 'Даты действия акта-допуска',
              value: commercialAccountingDatesString,
            },
          ]}
        />
      </StepWrapper>

      <StepWrapper>
        <StepTitle>3. Подключенные приборы</StepTitle>
        <div>
          {requestPayload.configuration &&
            requestPayload.communicationPipes?.map((pipe) => (
              <CommunicationPipeListItem
                configuration={requestPayload.configuration!}
                key={pipe.id}
                pipe={pipe}
              />
            ))}
          {!requestPayload.communicationPipes?.length && (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Нет подключённых приборов"
            />
          )}
        </div>
      </StepWrapper>
    </StyledModal>
  );
};
