import React, { FC } from 'react';
import { Props } from './ReportTypeModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { Blue, Bottom, Panel, Wrapper } from './ReportTypeModal.styled';
import { DeviceBigIcon, DocumentBigIcon } from 'ui-kit/icons';
import { useNavigate } from 'react-router-dom';

const formId = 'Report_Type_Modal';

export const ReportTypeModal: FC<Props> = ({
  handleReportTypeModalOpen,
  isOpen,
}) => {
  const navigate = useNavigate();

  const form = (
    <Wrapper>
      <Panel onClick={() => navigate(`/workWithReadings/standart`)}>
        <DocumentBigIcon /> Стандартный отчет
      </Panel>
      <Panel>
        <DeviceBigIcon /> Нестандартный отчет (Милуры)
      </Panel>
      <Bottom>
        Нужен архивный отчет?
        <Blue>Перейти в архив</Blue>
      </Bottom>
    </Wrapper>
  );

  return (
    <FormModal
      title="Выберите тип отчета"
      visible={isOpen}
      onCancel={() => handleReportTypeModalOpen(false)}
      formId={formId}
      form={form}
      customFooter={<></>}
    />
  );
};
