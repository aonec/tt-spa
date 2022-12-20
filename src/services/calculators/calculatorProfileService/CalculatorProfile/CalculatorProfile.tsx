import { PageHeader } from '01/shared/ui/PageHeader';
import _ from 'lodash';
import React, { FC, ReactElement, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { CalculatorIcon } from 'ui-kit/icons';
import { CommonInfo } from 'ui-kit/shared_components/CommonInfo';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { HeaderInfoString } from 'ui-kit/shared_components/HeaderInfoString';
import { Tabs } from 'ui-kit/Tabs';
import { getHousingStockAddress } from 'utils/getHousingStockAddress';
import { getTimeStringByUTC } from 'utils/getTimeStringByUTC';
import { CalculatorProfileGrouptype } from '../calculatorProfileService.constants';
import {
  AdditionalInfoWrapper,
  AddressLinkWrapper,
  Content,
  ContentWrapper,
  CalculatorIconSC,
  HeaderTitleWrapper,
  HeaderWrapper,
  TabsSC,
} from './CalculatorProfile.styled';
import { CalculatorProfileProps } from './CalculatorProfile.types';
import { ConnectionInfo } from './ConnectionInfo';
import { RelatedDevicesList } from './RelatedDevicesList';
import { RelatedNodesList } from './RelatedNodesList';

const { TabPane } = Tabs;

export const CalculatorProfile: FC<CalculatorProfileProps> = ({
  calculator,
  currentGrouptype,
  setGrouptype,
  handleOpenCloseCalculatorModal,
  handleOpenCheckCalculatorModal,
}) => {
  const history = useHistory();

  const {
    id,
    model,
    serialNumber,
    connection,
    address,
    lastCheckingDate,
    futureCheckingDate,
    isConnected,
    nodes,
  } = calculator;

  const relatedDevices = useMemo(
    () =>
      (nodes || [])
        .map((node) => {
          const { communicationPipes, number } = node;

          const devices = (communicationPipes || [])
            .map((pipe) => pipe.devices || [])
            .flat();

          return { devices, nodeNumber: number };
        })
        .flat(),
    [nodes]
  );

  const headerTitle = useMemo(() => `${model} (${serialNumber})`, [
    model,
    serialNumber,
  ]);

  const commonInfo = useMemo(
    () => (
      <CommonInfo
        items={[
          {
            key: 'Адрес',
            value: (
              <>
                {address && (
                  <AddressLinkWrapper to={`/objects/profile/${address?.id}`}>
                    {getHousingStockAddress(address, true)}
                  </AddressLinkWrapper>
                )}
              </>
            ),
          },
          {
            key: 'Дата поверки прибора',
            value: lastCheckingDate
              ? getTimeStringByUTC(lastCheckingDate, 'DD.MM.YYYY')
              : null,
          },
          {
            key: 'Дата следующей поверки прибора',
            value: futureCheckingDate
              ? getTimeStringByUTC(futureCheckingDate, 'DD.MM.YYYY')
              : null,
          },
        ]}
      />
    ),
    [calculator]
  );

  const menuButtons = useMemo(
    () => ({
      menuButtons: [
        {
          title: 'Редактировать вычислитель',
          onClick: () => history.push(`/calculators/${id}/edit`),
        },
        {
          title: 'Поверить вычислитель',
          onClick: () => handleOpenCheckCalculatorModal(calculator),
        },
        {
          title: 'Выгрузить отчёт об общедомовом потреблении',
          onClick: () => void null,
        },
        {
          title: 'Снять вычислитель с учёта',
          onClick: () => handleOpenCloseCalculatorModal(calculator),
          color: 'danger',
        },
      ],
    }),
    [handleOpenCheckCalculatorModal, handleOpenCloseCalculatorModal]
  );

  const contentComponents: {
    [key in CalculatorProfileGrouptype]: ReactElement;
  } = useMemo(
    () => ({
      [CalculatorProfileGrouptype.Common]: <>{commonInfo}</>,
      [CalculatorProfileGrouptype.Connection]: (
        <ConnectionInfo
          connection={connection}
          isConnected={isConnected || false}
        />
      ),
      [CalculatorProfileGrouptype.Nodes]: (
        <RelatedNodesList nodes={nodes || []} />
      ),
      [CalculatorProfileGrouptype.Related]: (
        <RelatedDevicesList pipeDevices={relatedDevices} />
      ),
      [CalculatorProfileGrouptype.Documents]: <></>,
    }),
    [calculator]
  );

  const component = contentComponents[currentGrouptype];

  return (
    <div>
      <GoBack />
      <HeaderWrapper>
        <CalculatorIconSC />
        <HeaderTitleWrapper>
          <PageHeader title={headerTitle} contextMenu={menuButtons} />
        </HeaderTitleWrapper>
      </HeaderWrapper>
      <AdditionalInfoWrapper>
        <>{getHousingStockAddress(address, true)}</>
      </AdditionalInfoWrapper>
      <TabsSC
        activeKey={currentGrouptype}
        onChange={(grouptype) =>
          setGrouptype(grouptype as CalculatorProfileGrouptype)
        }
      >
        <TabPane tab="Общие данные" key={CalculatorProfileGrouptype.Common} />
        <TabPane
          tab="Настройки соединения"
          key={CalculatorProfileGrouptype.Connection}
        />
        <TabPane tab="Узлы" key={CalculatorProfileGrouptype.Nodes} />
        <TabPane
          tab="Подключенные приборы"
          key={CalculatorProfileGrouptype.Related}
        />
        <TabPane tab="Документы" key={CalculatorProfileGrouptype.Documents} />
      </TabsSC>
      <ContentWrapper>
        <Content>{component}</Content>
        <div></div>
      </ContentWrapper>
    </div>
  );
};
