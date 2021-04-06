import React, { Dispatch, SetStateAction } from 'react';

import { Link } from 'react-router-dom';
import { StyledFooter, StyledModal, StyledModalBody } from '../Modal';
import ButtonTT from '../ButtonTT';

interface ModalCalculatorExistInstance {
  existDevice: number | undefined | null;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

export const ModalDeviceExists = ({
  existDevice,
  visible,
  setVisible,
}: ModalCalculatorExistInstance) => {
  function handleCancel() {
    setVisible(false);
  }

  return (
    <StyledModal
      width={800}
      visible={visible}
      footer={null}
      onCancel={handleCancel}
      onOk={handleCancel}
    >
      <StyledModalBody>
        <h2>
          В системе уже есть устройство с совпадающими настройками соединения
        </h2>
        {existDevice ? (
          <Link
            to={`/calculators/${existDevice}`}
          >{`Вычислитель с id: ${existDevice}`}</Link>
        ) : null}
      </StyledModalBody>
      <StyledFooter>
        <ButtonTT color={'white'} type="button" onClick={handleCancel}>
          Отмена
        </ButtonTT>
        <ButtonTT
          color={'red'}
          type="button"
          style={{ marginLeft: 16 }}
          onClick={handleCancel}
        >
          Изменить настройки соединения
        </ButtonTT>
      </StyledFooter>
    </StyledModal>
  );
};

export default ModalDeviceExists;
