import React, { FC, ReactNode, useCallback, useMemo } from 'react';
import queryString from 'query-string';
import { Empty, Tooltip, message } from 'antd';
import { GoBack } from 'ui-kit/shared/GoBack';
import { HeaderInfoString } from 'ui-kit/shared/HeaderInfoString';
import { ResourceIconLookup } from 'ui-kit/shared/ResourceIconLookup';
import { LinkCard } from 'ui-kit/shared/LinkCard';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import {
  ENodeRegistrationType,
  ESecuredIdentityRoleName,
  TaskGroupingFilter,
} from 'api/types';
import { DisplayNodesStatisticsContainer } from 'services/nodes/displayNodesStatisticsService';
import {
  Title,
  ContentWrapper,
  Wrapper,
  HeaderInfoStringWrapper,
  AdditionalAddress,
  IncorrectConfigurationIconSC,
  NodeNumberWrapper,
  PageHeaderSC,
  TabsSC,
} from './NodeProfilePage.styled';
import {
  NodeProfilePageProps,
  PipeNodeProfileSection,
} from './NodeProfilePage.types';
import { getHousingStockItemAddress } from 'utils/getHousingStockItemAddress';
import { CommonInfoTab } from './CommonInfoTab';
import { HousingMeteringDevicesList } from './HousingMeteringDevicesList';
import { NodeConnection } from './NodeConnection';
import { ContextMenuButtonColor } from 'ui-kit/ContextMenuButton/ContextMenuButton.types';
import { DisplayNodeChecksContainer } from 'services/nodes/displayNodeChecks';
import { HousingMeteringDeviceReadingsContainer } from 'services/devices/housingMeteringDevices/housingMeteringDeviceReadingsService';
import { getDeviceIds } from 'services/devices/housingMeteringDevices/housingMeteringDeviceReadingsService/housingMeteringDeviceReadingsService.utils';
import { usePermission } from 'hooks/usePermission';

export const NodeProfilePage: FC<NodeProfilePageProps> = ({
  isLoading,
  pipeNode,
  section = PipeNodeProfileSection.Common,
  handleChangeTab,
  handleEditNode,
  openChangeNodeStatusModal,
  openChangeNodeTypeModal,
  isPermitionToEditsNode,
}) => {
  const address = pipeNode?.address?.address;

  const contentComponents = useMemo(() => {
    if (!pipeNode) return;

    const dictionary: {
      [key in PipeNodeProfileSection]: ReactNode;
    } = {
      [PipeNodeProfileSection.Common]: <CommonInfoTab pipeNode={pipeNode} />,
      [PipeNodeProfileSection.Readings]: (
        <HousingMeteringDeviceReadingsContainer
          nodeId={pipeNode.id}
          resource={pipeNode.resource}
          deviceIds={getDeviceIds(pipeNode)}
        />
      ),
      [PipeNodeProfileSection.Stats]: (
        <DisplayNodesStatisticsContainer
          nodeId={pipeNode.id}
          pipeCount={pipeNode.communicationPipes?.length || 0}
        />
      ),
      [PipeNodeProfileSection.Connection]: <NodeConnection node={pipeNode} />,
      [PipeNodeProfileSection.Related]: (
        <HousingMeteringDevicesList
          configuration={pipeNode.configuration}
          communicationPipes={pipeNode.communicationPipes || []}
        />
      ),
      [PipeNodeProfileSection.Checks]: (
        <DisplayNodeChecksContainer pipeNodeId={pipeNode.id} />
      ),
      [PipeNodeProfileSection.Documents]: <></>,
    };

    return dictionary;
  }, [pipeNode]);

  const contentComponent = useMemo(() => {
    if (!contentComponents) {
      return null;
    }
    if (section !== PipeNodeProfileSection.Stats) {
      return <ContentWrapper>{contentComponents[section]}</ContentWrapper>;
    }
    return contentComponents[section];
  }, [section, contentComponents]);

  const isShowReadingsTab =
    pipeNode?.calculator === null ||
    pipeNode?.calculator?.isConnected === false;

  const isNodeCommercial =
    pipeNode?.registrationType === ENodeRegistrationType.Commercial;

  const isIncorrectConfig =
    pipeNode?.validationResult?.errors?.length !== 0 ||
    pipeNode?.validationResult?.warnings?.length !== 0;

  const handleClickChangeNodeType = useCallback(() => {
    if (
      pipeNode &&
      pipeNode?.registrationType !== ENodeRegistrationType.Technical
    ) {
      return openChangeNodeTypeModal(pipeNode);
    }
    return message.error('Технический тип узла нельзя изменить');
  }, [pipeNode, openChangeNodeTypeModal]);

  const isShowArchiveButton = usePermission([
    ESecuredIdentityRoleName.Administrator,
    ESecuredIdentityRoleName.ManagingFirmExecutor,
    ESecuredIdentityRoleName.ManagingFirmSpectator,
    ESecuredIdentityRoleName.ManagingFirmSpectatorRestricted,
    ESecuredIdentityRoleName.ManagingFirmSpectatingAdministrator,
  ]);

  const tabItems = useMemo(
    () => [
      { label: 'Общие данные', key: PipeNodeProfileSection.Common },
      { label: 'Статистика', key: PipeNodeProfileSection.Stats },
      ...(isShowReadingsTab
        ? [{ label: 'Ввод показаний', key: PipeNodeProfileSection.Readings }]
        : []),
      { label: 'Настройки соединения', key: PipeNodeProfileSection.Connection },
      { label: 'Подключенные приборы', key: PipeNodeProfileSection.Related },
      { label: 'История проверок', key: PipeNodeProfileSection.Checks },
    ],
    [isShowReadingsTab],
  );

  return (
    <WithLoader isLoading={isLoading}>
      {pipeNode && (
        <div>
          <GoBack />
          <PageHeaderSC
            title={
              <Title>
                <ResourceIconLookup
                  resource={pipeNode.resource}
                  style={{ transform: 'scale(1.2)' }}
                />
                <NodeNumberWrapper>
                  Узел {pipeNode.title}
                  {isIncorrectConfig && (
                    <Tooltip title="Проверьте конфигурацию узла">
                      <IncorrectConfigurationIconSC />
                    </Tooltip>
                  )}
                </NodeNumberWrapper>
              </Title>
            }
            contextMenu={{
              menuButtons: [
                {
                  title: 'Редактировать узел',
                  onClick: handleEditNode,
                  hidden: !isPermitionToEditsNode,
                },
                {
                  title: 'Сменить статус узла',
                  onClick: () => openChangeNodeStatusModal(pipeNode),
                  hidden: !isNodeCommercial || !isPermitionToEditsNode,
                },
                {
                  title: 'Изменить тип узла',
                  onClick: handleClickChangeNodeType,
                  color: ContextMenuButtonColor.danger,
                  hidden: !isPermitionToEditsNode,
                },
              ],
            }}
          />
          <HeaderInfoStringWrapper>
            <HeaderInfoString>
              <div>{address?.mainAddress?.city}</div>
              <div>
                {address?.mainAddress &&
                  getHousingStockItemAddress(address?.mainAddress)}{' '}
                {address?.additionalAddresses?.map((address) => (
                  <AdditionalAddress key={address.id}>
                    {getHousingStockItemAddress(address)}
                  </AdditionalAddress>
                ))}
              </div>
            </HeaderInfoString>
          </HeaderInfoStringWrapper>
          <TabsSC
            activeKey={section}
            onChange={(activeKey) =>
              handleChangeTab(activeKey as PipeNodeProfileSection)
            }
            items={tabItems}
          />
          <Wrapper>
            {contentComponent}
            <div>
              {isShowArchiveButton && (
                <LinkCard
                  text="Архив"
                  link={`/nodeArchive/${pipeNode.id}`}
                  showLink={true}
                />
              )}
              <LinkCard
                text={`Задачи: ${pipeNode.numberOfTasks}`}
                link={queryString.stringifyUrl({
                  url: `/tasks/list/${TaskGroupingFilter.Executing}`,
                  query: { pipeNodeId: pipeNode.id },
                })}
                showLink={Boolean(pipeNode.numberOfTasks)}
              />
            </div>
          </Wrapper>
        </div>
      )}
      {!pipeNode && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
    </WithLoader>
  );
};
