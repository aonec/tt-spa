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
import { axios } from 'api/axios';
import { setAppointmentsToControllerMutation } from 'services/services/distributeRecordsService/distributeRecordsService.api';
import { downloadURI } from 'utils/downloadByURL';

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
    return setAppointmentsToControllerMutation.finished.success.watch(
      async ({ result: { assignmentId } }) => {
        const res: string = await axios.get(
          `IndividualSeal/Assignments/${assignmentId}/File`,
          {
            responseType: 'blob',
          },
        );

        const url = window.URL.createObjectURL(new Blob([res]));

        const controller = controllers?.find(
          (elem) => elem.id === controllerId,
        );

        const fullName = [
          controller?.firstName,
          controller?.lastName,
          controller?.middleName,
        ]
          .filter(Boolean)
          .join('_');

        downloadURI(
          url,
          `задание_${dayjs(appointmentDate).format('DD.MM.YYYY')}_${fullName}`,
          false,
        );
      },
    ).unsubscribe;
  }, [appointmentDate, controllerId, controllers]);

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
