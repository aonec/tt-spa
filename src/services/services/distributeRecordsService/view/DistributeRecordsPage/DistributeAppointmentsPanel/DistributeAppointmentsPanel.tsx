import React, { FC, ReactNode, useCallback, useMemo, useState } from 'react';
import { DataNode } from 'antd/lib/tree';
import {
  CancelAllText,
  ContentWrapper,
  ControllerInfoTitle,
  ControllerInfoWrapper,
  ControllerWrapper,
  CountWrapper,
  Footer,
  HeaderWrapper,
  ListHeaderWrapper,
  LoaderWrapper,
  RootWrapperTitle,
  SelectAllText,
  TrashIconSC,
  TreeSC,
  Wrapper,
} from './DistributeAppointmentsPanel.styled';
import {
  AppointmentsIdWithController,
  DistributeAppointmentsPanelProps,
} from './DistributeAppointmentsPanel.types';
import { Input } from 'ui-kit/Input';
import {
  countSimilarityPointsForAppointment,
  getKeysByControllerId,
  prepareAppointmentsToTree,
} from './DistributeAppointmentsPanel.utils';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import { Empty } from 'antd';
import { Button } from 'ui-kit/Button';
import { getCountText } from 'utils/getCountText';
import { AppointmentsCountTexts } from './DistributeAppointmentsPanel.constants';
import _ from 'lodash';
import { InfoIcon } from 'ui-kit/icons';

export const DistributeAppointmentsPanel: FC<
  DistributeAppointmentsPanelProps
> = ({
  appointmentsInDistrict,
  selectedAppointmentsIds,
  handleSelectAppointments,
  isLoadingAppointments,
  handleUnselectDistrict,
  openDistributeAppointmentsModal,
  controllers,
  openRemoveAssignmentModal,
}) => {
  const [expandedKeys, setExpandedKeys] = useState<
    AppointmentsIdWithController[]
  >([]);

  const isAppointmentsExist = appointmentsInDistrict.length !== 0;

  const preparedTreeDataByControllers = useMemo(
    () =>
      _.sortBy(
        prepareAppointmentsToTree(appointmentsInDistrict),
        ({ controllerId }) => controllerId || '',
      ),
    [appointmentsInDistrict],
  );

  const handleChangeInputValue = useCallback(
    (value: string) => {
      let maxSimilarityPoints = 0;

      const appointmentWithSimilarityCount = appointmentsInDistrict.map(
        (appointment) => {
          const preparedAppointment = countSimilarityPointsForAppointment(
            value,
            appointment,
          );

          if (preparedAppointment.similarityPoints > maxSimilarityPoints) {
            maxSimilarityPoints = preparedAppointment.similarityPoints;
          }

          return preparedAppointment;
        },
      );

      const preparedNewKeys = _.uniq(
        appointmentWithSimilarityCount.reduce((acc, elem) => {
          if (elem.similarityPoints === maxSimilarityPoints) {
            return [...acc, elem];
          }
          return acc;
        }, [] as AppointmentsIdWithController[]),
      );

      setExpandedKeys(preparedNewKeys);
    },
    [appointmentsInDistrict],
  );

  const notDistributedAppointments = useMemo(
    () =>
      appointmentsInDistrict.reduce((acc, elem) => {
        if (!elem.controllerId) {
          return [...acc, elem.id];
        }
        return acc;
      }, [] as string[]),
    [appointmentsInDistrict],
  );

  const treeList = useMemo(
    () =>
      preparedTreeDataByControllers.map(({ controllerId, data }) => {
        const expKeys = getKeysByControllerId(expandedKeys, controllerId);
        const checkedKeys = controllerId ? [] : selectedAppointmentsIds;
        const controller = (controllers || []).find(
          (elem) => elem.id === controllerId,
        );

        const controllerInfo = ` ${controller?.lastName || ''} ${
          controller?.firstName || ''
        }`;
        const assignmentId =
          appointmentsInDistrict.find(
            (elem) => elem.controllerId === controllerId,
          )?.assignmentId || null;

        return (
          <>
            {controllerId && (
              <ControllerWrapper>
                <div>
                  <InfoIcon />
                </div>
                <div>
                  <ControllerInfoTitle>
                    Уже есть ранее распределенные заявки
                  </ControllerInfoTitle>
                  <ControllerInfoWrapper>
                    Контролер:
                    {controllerInfo}
                    {assignmentId && (
                      <TrashIconSC
                        onClick={() =>
                          openRemoveAssignmentModal(String(assignmentId))
                        }
                      />
                    )}
                  </ControllerInfoWrapper>
                </div>
              </ControllerWrapper>
            )}
            <TreeSC
              disabled={Boolean(controllerId)}
              selectable={false}
              checkable={true}
              treeData={data}
              titleRender={(elem): ReactNode | string => {
                const node = elem as DataNode;

                if (node.key !== node.title) {
                  return typeof node.title === 'function'
                    ? node.title(node)
                    : (node.title as React.ReactNode);
                }

                return (
                  <RootWrapperTitle>
                    {node.title}
                    <CountWrapper>
                      Заявки: {(node.children || []).length}
                    </CountWrapper>
                  </RootWrapperTitle>
                );
              }}
              onCheck={(_, info) => {
                const { checkedNodes } = info as { checkedNodes: DataNode[] };
                const filteredNodes = checkedNodes.filter((elem) =>
                  Boolean(elem.key !== elem.title),
                );

                handleSelectAppointments(
                  filteredNodes.map((elem) => String(elem.key as string)),
                );
              }}
              onExpand={(keys) =>
                setExpandedKeys((prev) => [
                  ...prev.filter((elem) => elem.controllerId !== controllerId),
                  ...keys.map((id) => ({ id, controllerId })),
                ])
              }
              expandedKeys={expKeys}
              checkedKeys={checkedKeys}
            />
          </>
        );
      }),
    [
      preparedTreeDataByControllers,
      expandedKeys,
      handleSelectAppointments,
      selectedAppointmentsIds,
      controllers,
      openRemoveAssignmentModal,
      appointmentsInDistrict,
    ],
  );

  return (
    <Wrapper>
      {isLoadingAppointments && (
        <LoaderWrapper>
          <WithLoader isLoading />
        </LoaderWrapper>
      )}
      {!isLoadingAppointments && (
        <>
          {isAppointmentsExist && (
            <>
              <HeaderWrapper>
                <Input
                  small
                  placeholder="Введите адрес"
                  onChange={(e) => handleChangeInputValue(e.target.value)}
                />
                <ListHeaderWrapper>
                  <SelectAllText
                    onClick={() =>
                      handleSelectAppointments(notDistributedAppointments)
                    }
                  >
                    Выбрать все ({notDistributedAppointments.length})
                  </SelectAllText>
                  <CancelAllText onClick={() => handleSelectAppointments([])}>
                    Отменить выбор
                  </CancelAllText>
                </ListHeaderWrapper>
              </HeaderWrapper>
              <ContentWrapper>{treeList}</ContentWrapper>
            </>
          )}
          {!isAppointmentsExist && (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Нет записей на опломбировку на выбранную дату"
            />
          )}
          <Footer>
            <Button type="ghost" size="s" onClick={handleUnselectDistrict}>
              Назад
            </Button>
            <Button
              onClick={openDistributeAppointmentsModal}
              size="s"
              disabled={!selectedAppointmentsIds.length}
            >
              Распределить{' '}
              {Boolean(selectedAppointmentsIds.length) &&
                `${selectedAppointmentsIds.length} 
                      ${getCountText(
                        selectedAppointmentsIds.length,
                        AppointmentsCountTexts,
                      )}`}
            </Button>
          </Footer>
        </>
      )}
    </Wrapper>
  );
};
