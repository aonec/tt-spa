import React, { FC, useEffect, useMemo } from 'react';
import { useUnit } from 'effector-react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { TabsSC } from './SettingPage.styled';
import { SettingPageProps } from './SettingPage.types';
import { inspectorAddressesResetService } from 'services/settings/inspectorsDistributionService/inspectorAddressesResetService/inspectorAddressesResetService.models';
import { InspectorsDistributionPage } from 'services/settings/inspectorsDistributionService/views/InspectorsDistributionPage';
import { InspectorAddressesResetModalContainer } from 'services/settings/inspectorsDistributionService/inspectorAddressesResetService/InspectorAddressesResetModalContainer';
import { PageHeader } from 'ui-kit/shared/PageHeader';
import { WorkingRangeTab } from 'services/workingRanges/WorkingRangeTab';
import { DistrictBordersContainer } from 'services/settings/districtBordersService';
import { developmentSettingsService } from 'services/developmentSettings/developmentSettings.models';
import { TemperatureGraphContainer } from 'services/settings/temperatureGraphService';

export const SettingPage: FC<SettingPageProps> = ({
  handleReassingInspector,
  handleEditTemperatureNormative,
}) => {
  const { featureToggles } = useUnit({
    featureToggles: developmentSettingsService.outputs.$featureToggles,
  });

  const { section } = useParams<{ section: string }>();
  const history = useHistory();
  const { pathname } = useLocation();
  const adminSettings = pathname.split('/')[1] === 'adminSettings';
  const isTemperatureGraphTab = pathname.split('/')[2] === 'temperatureGraph';

  const menuButtons = useMemo(() => {
    if (adminSettings) {
      return [
        {
          title: 'Редактировать температурный график',
          onClick: () => handleEditTemperatureNormative(true),
          hidden: !isTemperatureGraphTab,
        },
      ];
    }
    return [
      {
        title: 'Сбросить все адреса',
        onClick: inspectorAddressesResetService.inputs.openModal,
      },
      {
        title: 'Переназначить сотрудника',
        onClick: handleReassingInspector,
      },
    ];
  }, [
    adminSettings,
    handleReassingInspector,
    handleEditTemperatureNormative,
    isTemperatureGraphTab,
  ]);

  const settingsComponent = useMemo(() => {
    if (adminSettings) {
      return (
        <>
          {featureToggles.workingRanges && (
            <TabsSC.TabPane tab="Рабочие диапазоны узлов" key="operatingRanges">
              <WorkingRangeTab />
            </TabsSC.TabPane>
          )}
          {featureToggles.districtsManage && (
            <TabsSC.TabPane tab="Границы районов" key="districtBorder">
              <DistrictBordersContainer />
            </TabsSC.TabPane>
          )}
          {featureToggles.temperatureGraph && (
            <TabsSC.TabPane tab="Температурный график" key="temperatureGraph">
              <TemperatureGraphContainer />
            </TabsSC.TabPane>
          )}
        </>
      );
    }
    return (
      <>
        {featureToggles.controllersDistribution && (
          <TabsSC.TabPane
            tab="Распределение контролеров"
            key="controllers"
          ></TabsSC.TabPane>
        )}
        <TabsSC.TabPane tab="Распределение инспекторов" key="inspectors">
          <InspectorsDistributionPage />
        </TabsSC.TabPane>
        {featureToggles.districtsManage && (
          <TabsSC.TabPane tab="Границы районов" key="districtBorder">
            <DistrictBordersContainer />
          </TabsSC.TabPane>
        )}
      </>
    );
  }, [
    adminSettings,
    featureToggles.controllersDistribution,
    featureToggles.districtsManage,
    featureToggles.workingRanges,
    featureToggles.temperatureGraph,
  ]);

  useEffect(() => {
    const keys: { key: string; visible: boolean }[] = adminSettings
      ? [
          {
            key: 'operatingRanges',
            visible: featureToggles.workingRanges,
          },
          {
            key: 'districtBorder',
            visible: featureToggles.districtsManage,
          },
          { key: 'temperatureGraph', visible: featureToggles.temperatureGraph },
        ]
      : [
          {
            key: 'controllers',
            visible: featureToggles.controllersDistribution,
          },
          { key: 'inspectors', visible: true },
          {
            key: 'districtBorder',
            visible: true,
          },
        ];

    const path = keys.find((elem) => elem.visible);

    if (path) history.push(path.key);
  }, [
    adminSettings,
    featureToggles.controllersDistribution,
    featureToggles.districtsManage,
    featureToggles.temperatureGraph,
    featureToggles.workingRanges,
    history,
  ]);

  return (
    <>
      <InspectorAddressesResetModalContainer />

      <PageHeader
        title="Настройки"
        contextMenu={{
          menuButtons,
        }}
      />
      <TabsSC activeKey={section} onChange={history.push}>
        {settingsComponent}
      </TabsSC>
    </>
  );
};
