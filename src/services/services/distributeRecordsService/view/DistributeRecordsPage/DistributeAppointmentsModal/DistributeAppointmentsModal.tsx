import React, { FC } from 'react';
import moment from 'moment';
import { Props } from './DistributeAppointmentsModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { Wrapper } from './DistributeAppointmentsModal.styled';
import { DatePicker } from 'ui-kit/DatePicker';

export const DistributeAppointmentsModal: FC<Props> = ({
  isModalOpen,
  handleCloseModal,
  appointmentDate,
  controllers,
}) => {
  return (
    <FormModal
      title="Распределение записей опломбировки"
      visible={isModalOpen}
      formId="distribute-appointmets-form"
      onCancel={handleCloseModal}
      submitBtnText="Выдать задание"
      form={
        <Wrapper>
          <FormItem label="Контролёр">
            <Select placeholder="Выберите">
              {controllers?.map((elem) => (
                <Select.Option key={elem.id} value={elem.id}>
                  {elem.firstName} {elem.lastName}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
          <FormItem label="Дата">
            <DatePicker
              placeholder="Выберите"
              format="DD.MM.YYYY"
              value={appointmentDate ? moment(appointmentDate) : undefined}
              disabled
            />
          </FormItem>
        </Wrapper>
      }
    />
  );
};
