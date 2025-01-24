import { FC } from 'react';
import { Props } from './ExportStandartReportModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';
import {
  BillingPeriod,
  Title,
  Date,
} from '../../view/ReportPage/ReportPage.styled';
import dayjs from 'dayjs';
import { capitalize } from 'lodash';

export const ExportStandartReportModal: FC<Props> = ({
  isModalOpen,
  closeModal,
}) => {
  const date = dayjs().format('MMMM YYYY');

  const uppercaseDate = date
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ');

  return (
    <FormModal
      formId="readings-export"
      visible={isModalOpen}
      title="Экспорт показаний"
      onCancel={closeModal}
      submitBtnText="Экспортировать"
      form={
        <>
          <BillingPeriod>
            <Title>Расчетный период</Title>
            <Date>{uppercaseDate}</Date>
          </BillingPeriod>
        </>
      }
    />
  );
};
