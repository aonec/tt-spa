import { FC, useCallback } from 'react';
import { Switch, Tooltip } from 'antd';
import dayjs from 'dayjs';
import {
  DateWrapper,
  IntegrationPanel,
  IntegrationPanelTitle,
  SearchWrapper,
  TooltipItem,
  TooltipWrapper,
  Wrapper,
} from './MvituIntegrationSection.styled';
import { Props } from './MvituIntegrationSection.types';
import { Input } from 'ui-kit/Input';
import { Select } from 'ui-kit/Select';
import { Table } from 'ui-kit/Table';
import { ResourceIconLookup } from 'ui-kit/shared/ResourceIconLookup';
import { NodeIntegrationStatus } from './NodeIntegrationStatus';
import { ChangeStatusType, NodeStatusType, StatusType } from 'api/mvitu.types';
import { ContextMenuButton } from 'ui-kit/ContextMenuButton';
import { ContextMenuButtonColor } from 'ui-kit/ContextMenuButton/ContextMenuButton.types';
import { Pagination } from 'ui-kit/Pagination';
import { ChevronTopActive, ChevronTopDanger } from 'ui-kit/icons';

export const MvituIntegrationSection: FC<Props> = ({
  mvituNodesList,
  integrationData,
  handleUpdateStatus,
  isUpdateStatusLoading,
  changeNodeStatus,
  deleteNode,
  setPageNumber,
  nodesListRequestPayload,
  isLoading,
  setSearchParams,
}) => {
  const handleClickSwitch = useCallback(() => {
    const newStatus: ChangeStatusType =
      integrationData.status === StatusType.Active
        ? ChangeStatusType.Pause
        : ChangeStatusType.Active;

    handleUpdateStatus({ expectedStatus: newStatus });
  }, [handleUpdateStatus, integrationData]);

  return (
    <Wrapper>
      <IntegrationPanel>
        <IntegrationPanelTitle>Интеграция с ВИС МВИТУ</IntegrationPanelTitle>
        <Switch
          onClick={handleClickSwitch}
          defaultChecked={integrationData.status === StatusType.Active}
          loading={isUpdateStatusLoading}
        />
      </IntegrationPanel>
      <SearchWrapper>
        <Input
          value={nodesListRequestPayload.AddressTerm}
          onChange={(e) => setSearchParams({ AddressTerm: e.target.value })}
          placeholder="Адрес"
          small
        />
        <Select
          placeholder="Статус"
          small
          value={nodesListRequestPayload.Status}
          onChange={(value) =>
            setSearchParams({ Status: value as NodeStatusType })
          }
          allowClear
        >
          {Object.values(NodeStatusType).map((elem) => (
            <Select.Option key={elem} value={elem}>
              <NodeIntegrationStatus status={elem} />
            </Select.Option>
          ))}
        </Select>
      </SearchWrapper>
      <Table
        isLoading={isLoading}
        columns={[
          {
            label: 'Адрес',
            size: 'minmax(250px, 350px)',
            render: (item) => <>{item.building?.addressStr}</>,
          },
          {
            label: 'Рес.',
            size: '60px',
            render: (item) => <ResourceIconLookup resource={item.resource} />,
          },
          {
            label: 'Наименование узла',
            size: 'minmax(150px, 200px)',
            render: (item) => <>{item.nodeServiceZone?.name}</>,
          },
          {
            label: 'Статус интеграции',
            size: '150px',
            render: (item) => (
              <>
                <NodeIntegrationStatus status={item.status} />
              </>
            ),
          },
          {
            label: (
              <div style={{ whiteSpace: 'pre-wrap', width: '150px' }}>
                Дата последнего
                {`
`}
                передан. архива
              </div>
            ),
            size: '150px',
            render: (item) => (
              <>
                {item.integrationStatus?.lastTransmittedArchiveTime &&
                  dayjs(
                    item.integrationStatus?.lastTransmittedArchiveTime,
                  ).format('DD.MM.YYYY HH:mm')}
              </>
            ),
          },
          {
            label: (
              <div style={{ whiteSpace: 'pre-wrap', width: '100px' }}>
                Статус
                {`
`}
                передачи
              </div>
            ),
            size: '100px',
            render: (item) => (
              <Tooltip
                placement="leftTop"
                title={
                  <TooltipWrapper>
                    <TooltipItem>
                      Фактическое время передачи архива
                      <DateWrapper>
                        {item.integrationStatus?.lastIsReadyTransmitArchiveTime
                          ? dayjs(
                              item.integrationStatus
                                ?.lastIsReadyTransmitArchiveTime,
                            ).format('DD.MM.YYYY')
                          : '—'}
                      </DateWrapper>
                    </TooltipItem>
                    <TooltipItem>
                      Дата последнего доступного архива{' '}
                      <DateWrapper>
                        {item.integrationStatus?.lastTransmittedArchiveTime
                          ? dayjs(
                              item.integrationStatus
                                ?.lastTransmittedArchiveTime,
                            ).format('DD.MM.YYYY')
                          : '—'}
                      </DateWrapper>
                    </TooltipItem>
                    <TooltipItem>
                      Количество доступных архивов для передачи
                      <DateWrapper>
                        {item.integrationStatus?.isReadyTransmitTotalCount ||
                          '—'}
                      </DateWrapper>
                    </TooltipItem>
                  </TooltipWrapper>
                }
              >
                {item.integrationStatus?.isReadyTransmitTotalCount ? (
                  <ChevronTopActive />
                ) : (
                  <ChevronTopDanger />
                )}
              </Tooltip>
            ),
          },
          {
            label: '',
            size: '64px',
            render: (item) => (
              <>
                <ContextMenuButton
                  size="small"
                  menuButtons={[
                    {
                      title: `Поменять статус на "${
                        item.status === NodeStatusType.Active
                          ? 'Не активно'
                          : 'Активно'
                      }"`,
                      onClick: () => {
                        const newStatus =
                          item.status === NodeStatusType.Active
                            ? ChangeStatusType.Pause
                            : ChangeStatusType.Active;

                        changeNodeStatus({
                          nodeId: item.id,
                          expectedStatus: newStatus,
                        });
                      },
                    },
                    {
                      title: 'Удалить узел из интеграции',
                      color: ContextMenuButtonColor.danger,
                      onClick: () => deleteNode(item.id),
                    },
                  ]}
                />
              </>
            ),
          },
        ]}
        elements={mvituNodesList?.items || []}
      />
      <Pagination
        pageSize={nodesListRequestPayload.PageSize}
        total={mvituNodesList?.totalItems}
        current={nodesListRequestPayload.PageNumber}
        onChange={(pageNumber) => setPageNumber(pageNumber)}
      />
    </Wrapper>
  );
};
