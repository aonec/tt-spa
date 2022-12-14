import { PageHeader } from '01/shared/ui/PageHeader';
import moment from 'moment';
import React, { FC, useMemo } from 'react';
import { CalculatorIcon } from 'ui-kit/icons';
import { CommonInfo } from 'ui-kit/shared_components/CommonInfo';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { HeaderInfoString } from 'ui-kit/shared_components/HeaderInfoString';
import { getHousingStockAddress } from 'utils/getHousingStockAddress';
import { CalculatorProfileGrouptype } from '../calculatorProfileService.constants';
import {
  AdditionalInfoWrapper,
  AddressLinkWrapper,
  HeaderWrapper,
  TabsSC,
  Wrapper,
} from './CalculatorProfile.styled';
import { CalculatorProfileProps } from './CalculatorProfile.types';

const { TabPane } = TabsSC;

export const CalculatorProfile: FC<CalculatorProfileProps> = ({
  calculator,
  currentGrouptype,
  setGrouptype,
}) => {
  const {
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
            key: 'Адрес ',
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
            value: moment(lastCheckingDate).format('DD.MM.YYYY'),
          },
          {
            key: 'Дата следующей поверки прибора',
            value: moment(futureCheckingDate).format('DD.MM.YYYY'),
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

  return (
    <Wrapper>
      <GoBack />
      <HeaderWrapper>
        <CalculatorIcon width={24} height={16} />
        <PageHeader title={headerTitle} />
      </HeaderWrapper>
      <AdditionalInfoWrapper>
        <HeaderInfoString>
          <>{address?.address?.mainAddress?.city || ''}</>
          {getHousingStockAddress(address)}
        </HeaderInfoString>
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
    </Wrapper>
  );
};
