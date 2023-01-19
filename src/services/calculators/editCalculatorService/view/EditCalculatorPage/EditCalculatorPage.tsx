import React, { FC } from 'react';
import {
  CalculatorModel,
  CalculatorNumber,
  CalculatorTitle,
  PageTitle,
  Wrapper,
} from './EditCalculatorPage.styled';
import {
  EditCalculatorPageProps,
  EditCalculatorTabs,
} from './EditCalculatorPage.types';
import { useHistory } from 'react-router-dom';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { PageHeader } from '01/shared/ui/PageHeader';
import { HeaderInfoString } from 'ui-kit/shared_components/HeaderInfoString';
import { getHousingStockItemAddress } from 'utils/getHousingStockItemAddress';
import { Tabs } from 'ui-kit/Tabs';
import { EditConnectionContainer } from './Tabs/editConnectionService';
import { EditMainInfoContainer } from './Tabs/editMainInfoService';

export const EditCalculatorPage: FC<EditCalculatorPageProps> = ({
  calculator,
  currentTab,
  handleChangeTab,
}) => {
  const address = calculator?.address?.address?.mainAddress;

  const history = useHistory();
  const onCancel = () => history.goBack();

  return (
    <Wrapper>
      <GoBack />

      <PageHeader
        title={
          <PageTitle>
            <CalculatorTitle>
              <CalculatorModel>{calculator?.model}</CalculatorModel>
              <CalculatorNumber>{`(${calculator?.serialNumber}). Редактирование`}</CalculatorNumber>
            </CalculatorTitle>

            <HeaderInfoString>
              {address?.city}
              {address && getHousingStockItemAddress(address)}
            </HeaderInfoString>
          </PageTitle>
        }
      />

      <Tabs
        onChange={(value) => {
          handleChangeTab(value as EditCalculatorTabs);
        }}
        activeKey={currentTab}
      >
        <Tabs.TabPane tab="Общие данные" key={EditCalculatorTabs.CommonInfo} />
        <Tabs.TabPane
          tab="Настройки соединения"
          key={EditCalculatorTabs.Connection}
        />
        <Tabs.TabPane tab="Документы" key={EditCalculatorTabs.Documents} />
      </Tabs>

      {currentTab === EditCalculatorTabs.CommonInfo && (
        <EditMainInfoContainer calculator={calculator} onCancel={onCancel} />
      )}
      {currentTab === EditCalculatorTabs.Connection && (
        <EditConnectionContainer />
      )}
      {currentTab === EditCalculatorTabs.Documents && (
        <h3>Раздел в разработке</h3>
      )}
    </Wrapper>
  );
};
