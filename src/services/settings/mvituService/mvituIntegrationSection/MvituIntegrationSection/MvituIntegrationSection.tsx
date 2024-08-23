import { FC, useCallback } from 'react';
import { Switch } from 'antd';
import {
  IntegrationPanel,
  IntegrationPanelTitle,
  SearchWrapper,
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

export const MvituIntegrationSection: FC<Props> = ({
  mvituNodesList,
  integrationData,
  handleUpdateStatus,
  isUpdateStatusLoading,
  changeNodeStatus,
  deleteNode,
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
        <Input placeholder="Адрес" small />
        <Select placeholder="Статус" small />
      </SearchWrapper>
      <Table
        floating
        columns={[
          {
            label: 'Адрес',
            size: '350px',
            render: (item) => <>{item.building?.addressStr}</>,
          },
          {
            label: 'Рес.',
            size: '100px',
            render: (item) => <ResourceIconLookup resource={item.resource} />,
          },
          {
            label: 'Наименование узла',
            size: '200px',
            render: (item) => <>Узел {item.title}</>,
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
    </Wrapper>
  );
};
