import React, { FC, ReactNode, useEffect, useMemo } from 'react';
import { useUnit } from 'effector-react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { TabsSC } from './SettingPage.styled';
import { SettingPageProps, SettingsPageSection } from './SettingPage.types';
import { inspectorAddressesResetService } from 'services/settings/inspectorsDistributionService/inspectorAddressesResetService/inspectorAddressesResetService.models';
import { InspectorsDistributionPage } from 'services/settings/inspectorsDistributionService/views/InspectorsDistributionPage';
import { InspectorAddressesResetModalContainer } from 'services/settings/inspectorsDistributionService/inspectorAddressesResetService/InspectorAddressesResetModalContainer';
import { PageHeader } from 'ui-kit/shared/PageHeader';
import { WorkingRangeTab } from 'services/workingRanges/WorkingRangeTab';
import { DistrictBordersContainer } from 'services/settings/districtBordersService';
import { developmentSettingsService } from 'services/developmentSettings/developmentSettings.models';
import {
  TemperatureGraphContainer,
  temperatureGraphService,
} from 'services/settings/temperatureGraphService';

export const SettingPage: FC<SettingPageProps> = ({
  handleReassingInspector,
  handleEditTemperatureNormative,
  isAdminSettings,
  setModalOpen,
}) => {
  const { featureToggles, deletingRowIds } = useUnit({
    featureToggles: developmentSettingsService.outputs.$featureToggles,
    deletingRowIds: temperatureGraphService.outputs.$deletingRowIds,
  });

  const isDeletingTemperatureNormativesMod = Boolean(deletingRowIds.length);

  const { section } = useParams<{ section: SettingsPageSection }>();

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isTemperatureGraphTab = pathname.split('/')[2] === 'temperatureGraph';

  const pagePath = isAdminSettings ? 'adminSettings' : 'settings';

  const menuButtons = useMemo(() => {
    if (isAdminSettings) {
      return isDeletingTemperatureNormativesMod
        ? []
        : [
            {
              title: 'Редактировать температурный график',
              onClick: () => handleEditTemperatureNormative(true),
              hidden: !isTemperatureGraphTab,
            },
            {
              title: 'Загрузить новый температурный график',
              onClick: () => setModalOpen(true),
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
    isAdminSettings,
    handleReassingInspector,
    isDeletingTemperatureNormativesMod,
    isTemperatureGraphTab,
    handleEditTemperatureNormative,
    setModalOpen,
  ]);

  const components: { [key in SettingsPageSection]: ReactNode } = {
    [SettingsPageSection.operatingRanges]: <WorkingRangeTab />,
    [SettingsPageSection.temperatureGraph]: <TemperatureGraphContainer />,
    [SettingsPageSection.districtBorder]: <DistrictBordersContainer />,
    [SettingsPageSection.controllers]: <></>,
    [SettingsPageSection.inspectors]: <InspectorsDistributionPage />,
  };

  const tabItems = useMemo(() => {
    if (isAdminSettings) {
      return [
        ...(featureToggles.workingRanges
          ? [{ label: 'Рабочие диапазоны узлов', key: 'operatingRanges' }]
          : []),
        { label: 'Температурный график', key: 'temperatureGraph' },
      ];
    }

    return [
      ...(featureToggles.districtsManage
        ? [{ label: 'Границы районов', key: 'districtBorder' }]
        : []),
      ...(featureToggles.controllersDistribution
        ? [{ label: 'Распределение контролеров', key: 'controllers' }]
        : []),
      { label: 'Распределение инспекторов', key: 'inspectors' },
    ];
  }, [
    isAdminSettings,
    featureToggles.controllersDistribution,
    featureToggles.districtsManage,
    featureToggles.workingRanges,
  ]);

  useEffect(() => {
    const keys: { key: string; visible: boolean }[] = isAdminSettings
      ? [
          {
            key: 'operatingRanges',
            visible: featureToggles.workingRanges,
          },
          { key: 'temperatureGraph', visible: true },
        ]
      : [
          {
            key: 'districtBorder',
            visible: featureToggles.districtsManage,
          },
          {
            key: 'controllers',
            visible: featureToggles.controllersDistribution,
          },
          { key: 'inspectors', visible: true },
        ];

    const path = keys.find((elem) => elem.visible);

    if (pathname.split('/').length === 2 && path)
      navigate(`/${pagePath}/${path.key}`);
  }, [
    isAdminSettings,
    featureToggles.controllersDistribution,
    featureToggles.districtsManage,
    featureToggles.workingRanges,
    navigate,
    pathname,
    pagePath,
  ]);

  if (!section) return null;

  return (
    <>
      <InspectorAddressesResetModalContainer />

      <PageHeader
        title={isAdminSettings ? 'Настройки' : 'Настройки оператора'}
        contextMenu={{
          menuButtons,
        }}
      />
      <TabsSC
        activeKey={section}
        onChange={(key) =>
          navigate(`/${pagePath}/${key}`, {
            replace: true,
          })
        }
        items={tabItems}
      />
      {components[section]}
    </>
  );
};
