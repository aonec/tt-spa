import React from 'react';
import { StyledModal } from '../../tt-components/Modal';
import { sendServiceZoneButtonClicked, inputChanged } from './models/events';
import { useStore } from 'effector-react';
import { $addZoneInput, $isAddServiceModalShown } from './models/store';
import ButtonTT from '../../tt-components/ButtonTT';
import InputTT from '../../tt-components/InputTT';

const AddNewZonesModal = () => {
  const input = useStore($addZoneInput);
  const isModalVisible = useStore($isAddServiceModalShown);

  return (
    <StyledModal visible={isModalVisible}>
      <InputTT onChange={inputChanged} value={input} />
      <ButtonTT
        onClick={(e: any) => {
          e.preventDefault();
          sendServiceZoneButtonClicked(e);
        }}
      >
        Отправить
      </ButtonTT>
    </StyledModal>
  );
};

export default AddNewZonesModal;
