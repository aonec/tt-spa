import React, { FC, useMemo } from 'react';
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
import {  useNavigate } from 'react-router-dom';
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

  const history =  useNavigate();
  const onCancel = () => history(-1);

  const tabItems = useMemo(
    () => [
      { label: 'Общие данные', key: EditCalculatorTabs.CommonInfo },
      { label: 'Настройки соединения', key: EditCalculatorTabs.Connection },
      { label: 'Документы', key: EditCalculatorTabs.Documents },
    ],
    [],
  );

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
            items={tabItems}
          />

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
