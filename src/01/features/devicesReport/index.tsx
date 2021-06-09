import React from 'react';
import { Footer, Header } from '../../shared/ui/Modal/Modal';
import { StyledModal, StyledModalBody } from '../../tt-components/Modal';
import { useStore } from 'effector-react';
import {
  $isDeviceReportModalVisible,
  downloadDeviceReportCancelButtonClicked,
  downloadDeviceReportConfirmButtonClicked,
  downloadDevicesReportFx,
} from './models';
import ButtonTT from '../../tt-components/ButtonTT';
import { Loader } from '../../_components/Loader';
import InputTT from '../../tt-components/InputTT';

export const DevicesReportModal = () => {
  const isVisible = useStore($isDeviceReportModalVisible);
  const pending = useStore(downloadDevicesReportFx.pending);
  const handleCancel = () => downloadDeviceReportCancelButtonClicked();
  const onSubmit = () => downloadDeviceReportConfirmButtonClicked();

  return (
    <StyledModal
      visible={isVisible}
      width={800}
      onCancel={handleCancel}
      footer={
        <Footer>
          <ButtonTT color={'white'} key="back" onClick={handleCancel}>
            Отмена
          </ButtonTT>
          <ButtonTT
            color="blue"
            disabled={pending}
            key="submit"
            onClick={onSubmit}
          >
            {pending ? <Loader show={true} /> : 'Добавить'}
          </ButtonTT>
        </Footer>
      }
    >
      <Header>Выгрузка отчета об общедомовом потреблении</Header>
      <InputTT readonly value={'Список приборов.xlsx'} />
    </StyledModal>
  );
};
