import React, { Dispatch, SetStateAction } from 'react';

import { Link } from 'react-router-dom';
import { StyledFooter, StyledModal, StyledModalBody } from '../Modal';
import styled from 'styled-components';
import { ButtonSC } from './ModalDeviceExists.styled';

interface ModalCalculatorExistInstance {
  existDevice: number | undefined | null;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  type: 'calculator' | 'housingMeteringDevice' | 'individualDevice';
}

export const ModalDeviceExists = ({
  existDevice,
  visible,
  setVisible,
  type,
}: ModalCalculatorExistInstance) => {
  function handleCancel() {
    setVisible(false);
  }

  const deviceType = () => {
    if (type === 'calculator') {
      return 'calculators';
    }
    if (type === 'housingMeteringDevice') {
      return 'housingMeteringDevices';
    }
    if (type === 'individualDevice') {
      return 'individualDevices';
    }
  };

  return (
    <StyledModal
      width={800}
      visible={visible}
      footer={null}
      onCancel={handleCancel}
      onOk={handleCancel}
    >
      <StyledModalBody>
        <Header>В системе уже есть устройство с совпадающими данными</Header>
        {existDevice ? (
          <Link to={`/${deviceType}/${existDevice}`}>
            <DeviceLink>{`Устройство с id: ${existDevice}`}</DeviceLink>
          </Link>
        ) : null}
        <span>
          Пожалуйста, удалите существующее устройство, либо создайте новое
          устройство с другими настройками соединения
        </span>
      </StyledModalBody>
      <StyledFooter>
        <ButtonSC type="danger" onClick={handleCancel}>
          Изменить настройки соединения
        </ButtonSC>
      </StyledFooter>
    </StyledModal>
  );
};

export default ModalDeviceExists;

const Header = styled.h2`
  font-style: normal;
  font-weight: 300;
  font-size: 32px;
  line-height: 48px;
`;

const DeviceLink = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 32px;
`;
