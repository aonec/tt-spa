import React, { FC, useCallback, useEffect, useState } from 'react';
import dayjs from 'api/dayjs';
import { Props } from './DistributeAppointmentsModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import {
  LinkButtonWrapper,
  Wrapper,
} from './DistributeAppointmentsModal.styled';
import { DatePicker } from 'ui-kit/DatePicker';
import { LinkButton } from 'ui-kit/shared/LinkButton';
import {
  CreateControllerContainer,
  createIndividualSealControllerMutation,
} from 'services/services/distributeRecordsService/createControllerService';

export const DistributeAppointmentsModal: FC<Props> = ({
  isModalOpen,
  handleCloseModal,
  appointmentDate,
  controllers,
  openCreateControllerModal,
  setAppointmentsToController,
  selectedAppointmentsIds,
  isLoadingDistributeAppointments,
}) => {
  const [controllerId, setControllerId] = useState<string | null>(null);

  useEffect(() => {
    return createIndividualSealControllerMutation.finished.success.watch(
      async ({ result }) => {
        setControllerId(result);
      },
    ).unsubscribe;
  }, []);

  useEffect(() => {
    if (!isModalOpen) {
      setControllerId(null);
    }
  }, [isModalOpen]);

  const handleSubmit = useCallback(() => {
    if (!controllerId) return;

    setAppointmentsToController({
      controllerId,
      appointmentIds: selectedAppointmentsIds,
    });
  }, [controllerId, selectedAppointmentsIds, setAppointmentsToController]);

  return (
    <>
      <CreateControllerContainer />
      <FormModal
        formId="distribute-appointmets-form"
        title="Распределение записей опломбировки"
        submitBtnText="Выдать задание"
        visible={isModalOpen}
        disabled={!controllerId}
        onCancel={handleCloseModal}
        onSubmit={handleSubmit}
        loading={isLoadingDistributeAppointments}
        form={
          <Wrapper>
            <FormItem label="Контролёр">
              <Select
                placeholder="Выберите"
                value={controllerId || undefined}
                onChange={(value) => setControllerId(value as string)}
              >
                {controllers?.map((elem) => (
                  <Select.Option key={elem.id} value={elem.id}>
                    {elem.firstName} {elem.lastName} {elem.middleName}
                  </Select.Option>
                ))}
              </Select>
            </FormItem>
            <LinkButtonWrapper>
              <LinkButton onClick={openCreateControllerModal}>
                + Добавить контролера
              </LinkButton>
            </LinkButtonWrapper>
            <FormItem label="Дата">
              <DatePicker
                placeholder="Выберите"
                format="DD.MM.YYYY"
                value={appointmentDate ? dayjs(appointmentDate) : undefined}
                disabled
              />
            </FormItem>
          </Wrapper>
        }
      />
    </>
  );
};
