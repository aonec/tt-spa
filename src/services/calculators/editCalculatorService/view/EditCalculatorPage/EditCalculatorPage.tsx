import React, { FC } from 'react';
import {
  CalculatorModel,
  CalculatorNumber,
  CalculatorTitle,
  LoaderWrapper,
  PageTitle,
  Wrapper,
} from './EditCalculatorPage.styled';
import {
  EditCalculatorPageProps,
  EditCalculatorTabs,
} from './EditCalculatorPage.types';
import { useHistory } from 'react-router-dom';
import { GoBack } from 'ui-kit/shared/GoBack';
import { PageHeader } from 'ui-kit/shared/PageHeader';
import { HeaderInfoString } from 'ui-kit/shared/HeaderInfoString';
import { getHousingStockItemAddress } from 'utils/getHousingStockItemAddress';
import { Tabs } from 'ui-kit/Tabs';
import { EditMainInfo } from './Tabs/EditMainInfo';
import { EditConnection } from './Tabs/EditConnection';
import { WithLoader } from 'ui-kit/shared/WithLoader';

export const EditCalculatorPage: FC<EditCalculatorPageProps> = ({
  calculator,
  currentTab,
  handleChangeTab,
  calculatorTypesSelectItems,
  handleSubmit,
  isCalculatorLoading,
  sameConnectionCalculator,
  handleCloseModal,
  isModalOpen,
}) => {
  const address = calculator?.address?.address?.mainAddress;

  const history = useHistory();
  const onCancel = () => history.goBack();

  return (
    <Wrapper>
      <GoBack />

      <LoaderWrapper>
        <WithLoader isLoading={isCalculatorLoading} />
      </LoaderWrapper>

      {!isCalculatorLoading && (
        <>
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
            <Tabs.TabPane
              tab="Общие данные"
              key={EditCalculatorTabs.CommonInfo}
            />
            <Tabs.TabPane
              tab="Настройки соединения"
              key={EditCalculatorTabs.Connection}
            />
            <Tabs.TabPane tab="Документы" key={EditCalculatorTabs.Documents} />
          </Tabs>
          {currentTab === EditCalculatorTabs.CommonInfo && (
            <EditMainInfo
              calculator={calculator}
              onCancel={onCancel}
              calculatorTypesSelectItems={calculatorTypesSelectItems}
              onSubmit={handleSubmit}
            />
          )}
          {currentTab === EditCalculatorTabs.Connection && (
            <EditConnection
              calculator={calculator}
              onCancel={onCancel}
              onSubmit={handleSubmit}
              sameConnectionCalculator={sameConnectionCalculator}
              handleCloseModal={handleCloseModal}
              isModalOpen={isModalOpen}
            />
          )}
          {currentTab === EditCalculatorTabs.Documents && (
            <h3>Раздел в разработке</h3>
          )}
        </>
      )}
    </Wrapper>
  );
};
