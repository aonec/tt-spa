import React, { Dispatch, SetStateAction } from 'react';

import { Link } from 'react-router-dom';
import { StyledFooter, StyledModal, StyledModalBody } from '../Modal';
import ButtonTT from '../ButtonTT';

interface ModalCalculatorExistInstance {
  existCalculator: number | undefined | null;
  setExistCalculator: Dispatch<SetStateAction<number | undefined | null>>;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

export const ModalDeviceExist = ({
  existCalculator,
  setExistCalculator,
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
        {existCalculator === null ? null : (
          <Link
            to={`/calculators/${existCalculator}`}
          >{`Вычислитель с id: ${existCalculator}`}</Link>
        )}
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

export default ModalDeviceExist;
