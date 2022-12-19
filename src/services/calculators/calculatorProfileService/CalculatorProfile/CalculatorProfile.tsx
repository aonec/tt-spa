import { PageHeader } from '01/shared/ui/PageHeader';
import moment from 'moment';
import React, { FC, useMemo } from 'react';
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
  CalculatorIconSC,
  HeaderTitleWrapper,
  HeaderWrapper,
  TabsSC,
} from './CalculatorProfile.styled';
import { CalculatorProfileProps } from './CalculatorProfile.types';

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
  } = calculator;
  const { ipV4, deviceAddress, port } = connection || {};

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

  const connectionInfo = useMemo(
    () => (
      <CommonInfo
        items={[
          { key: 'IP адрес вычислителя', value: ipV4 },
          { key: 'Порт', value: port },
          { key: 'Адрес прибора', value: deviceAddress },
        ]}
      />
    ),
    [connection]
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
        <TabPane tab="Общие данные" key={CalculatorProfileGrouptype.Common}>
          {commonInfo}
        </TabPane>

        <TabPane
          tab="Настройки соединения"
          key={CalculatorProfileGrouptype.Connection}
        >
          {connectionInfo}
        </TabPane>

        <TabPane tab="Узлы" key={CalculatorProfileGrouptype.Nodes}></TabPane>

        <TabPane
          tab="Подключенные приборы"
          key={CalculatorProfileGrouptype.Related}
        ></TabPane>

        <TabPane
          tab="Документы"
          key={CalculatorProfileGrouptype.Documents}
        ></TabPane>
      </TabsSC>
    </div>
  );
};
