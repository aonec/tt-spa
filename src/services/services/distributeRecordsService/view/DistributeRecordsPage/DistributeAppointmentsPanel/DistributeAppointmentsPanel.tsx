import React, { FC, useCallback, useMemo, useState } from 'react';
import {
  CancelAllText,
  ContentWrapper,
  ControllerInfoTitle,
  ControllerWrapper,
  CountWrapper,
  Footer,
  HeaderWrapper,
  ListHeaderWrapper,
  LoaderWrapper,
  RootWrapperTitle,
  SelectAllText,
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
import { WithLoader } from 'ui-kit/shared_components/WithLoader';
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
}) => {
  const [expandedKeys, setExpandedKeys] = useState<
    AppointmentsIdWithController[]
  >([]);

  const isAppointmentsExist = appointmentsInDistrict.length !== 0;

  const preparedTreeDataByControllers = useMemo(
    () =>
      prepareAppointmentsToTree(appointmentsInDistrict).sort(
        (first, second) => {
          if (first.controllerId === null) {
            return -1;
          }
          if (second.controllerId === null) {
            return 1;
          }
          return 0;
        },
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

  const treeList = useMemo(
    () =>
      preparedTreeDataByControllers.map(({ controllerId, data }) => {
        const expKeys = getKeysByControllerId(expandedKeys, controllerId);
        const checkedKeys = getKeysByControllerId(
          selectedAppointmentsIds,
          controllerId,
        );
        const controller = (controllers || []).find(
          (elem) => elem.id === controllerId,
        );

        const controllerInfo = ` ${controller?.lastName || ''} ${
          controller?.firstName || ''
        }`;

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
                  Контролер:
                  {controllerInfo}
                </div>
              </ControllerWrapper>
            )}
            <TreeSC
              selectable={false}
              checkable={true}
              treeData={data}
              titleRender={(elem) => {
                if (elem.key !== elem.title) {
                  return elem.title;
                }
                return (
                  <RootWrapperTitle>
                    {elem.title}
                    <CountWrapper>
                      Заявки: {(elem.children || []).length}
                    </CountWrapper>
                  </RootWrapperTitle>
                );
              }}
              onCheck={(_, info) => {
                const { checkedNodes } = info;
                const filteredNodes = checkedNodes.filter((elem) =>
                  Boolean(elem.key !== elem.title),
                );

                handleSelectAppointments([
                  ...selectedAppointmentsIds.filter(
                    (elem) => elem.controllerId !== controllerId,
                  ),
                  ...filteredNodes.map((elem) => ({
                    id: String(elem.key),
                    controllerId,
                  })),
                ]);
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
                      handleSelectAppointments(appointmentsInDistrict)
                    }
                  >
                    Выбрать все ({appointmentsInDistrict.length})
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
            <Button type="ghost" size="small" onClick={handleUnselectDistrict}>
              Назад
            </Button>
            <Button
              onClick={openDistributeAppointmentsModal}
              size="small"
              disabled={!selectedAppointmentsIds.length}
            >
              Распределить
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
