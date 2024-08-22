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
import { MvituContainer } from 'services/settings/mvituService';
import { mvituService } from 'services/settings/mvituService/mvituService.models';

export const SettingPage: FC<SettingPageProps> = ({
  handleReassingInspector,
  handleEditTemperatureNormative,
  isAdminSettings,
  setModalOpen,
}) => {
  const { featureToggles, deletingRowIds, handleAddNodeToIntegration } =
    useUnit({
      featureToggles: developmentSettingsService.outputs.$featureToggles,
      deletingRowIds: temperatureGraphService.outputs.$deletingRowIds,
      handleAddNodeToIntegration:
        mvituService.inputs.handleAddNodeToIntegration,
    });

  const isDeletingTemperatureNormativesMod = Boolean(deletingRowIds.length);

  const { section } = useParams<{ section: SettingsPageSection }>();

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isTemperatureGraphTab = pathname.split('/')[2] === 'temperatureGraph';

  const pagePath = isAdminSettings ? 'adminSettings' : 'settings';

  const menuButtons = useMemo(() => {
    if (isAdminSettings) {
      if (section === 'mvitu') {
        return [
          {
            title: 'Добавить узел в интеграцию',
            onClick: handleAddNodeToIntegration,
          },
        ];
      }

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
    section,
    isDeletingTemperatureNormativesMod,
    isTemperatureGraphTab,
    handleAddNodeToIntegration,
    handleEditTemperatureNormative,
    setModalOpen,
  ]);

  const components: { [key in SettingsPageSection]: ReactNode } = {
    [SettingsPageSection.operatingRanges]: <WorkingRangeTab />,
    [SettingsPageSection.temperatureGraph]: <TemperatureGraphContainer />,
    [SettingsPageSection.districtBorder]: <DistrictBordersContainer />,
    [SettingsPageSection.controllers]: <></>,
    [SettingsPageSection.inspectors]: <InspectorsDistributionPage />,
    [SettingsPageSection.mvitu]: <MvituContainer />,
  };

  const tabItems = useMemo(() => {
    const tabsArray = [];

    if (isAdminSettings) {
      if (featureToggles.workingRanges) {
        tabsArray.push({
          label: 'Рабочие диапазоны узлов',
          key: 'operatingRanges',
        });
      }

      tabsArray.push({
        label: 'Температурный график',
        key: 'temperatureGraph',
      });

      if (featureToggles.mvitu) {
        tabsArray.push({ label: 'Интеграция с ВИС МВИТУ', key: 'mvitu' });
      }

      return tabsArray;
    }

    if (featureToggles.districtsManage) {
      tabsArray.push({ label: 'Границы районов', key: 'districtBorder' });
    }

    if (featureToggles.controllersDistribution) {
      tabsArray.push({
        label: 'Распределение контролеров',
        key: 'controllers',
      });
    }

    return tabsArray;
  }, [
    isAdminSettings,
    featureToggles.districtsManage,
    featureToggles.controllersDistribution,
    featureToggles.workingRanges,
    featureToggles.mvitu,
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
