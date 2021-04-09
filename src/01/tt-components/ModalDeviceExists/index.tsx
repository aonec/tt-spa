import React, {Dispatch, SetStateAction} from 'react';

import {Link} from 'react-router-dom';
import {StyledFooter, StyledModal, StyledModalBody} from '../Modal';
import ButtonTT from '../ButtonTT';
import styled from 'styled-components';

interface ModalCalculatorExistInstance {
    existDevice: number | undefined | null;
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
    type: 'calculator' | 'housingMeteringDevice'
}

export const ModalDeviceExists = ({
                                      existDevice,
                                      visible,
                                      setVisible,
                                      type
                                  }: ModalCalculatorExistInstance) => {
    function handleCancel() {
        setVisible(false);
    }

    const deviceType = type === 'calculator' ? 'calculators' : 'housingMeteringDevices'

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
                <ButtonTT
                    color={'red'}
                    type="button"
                    style={{marginLeft: 16}}
                    onClick={handleCancel}
                >
                    Изменить настройки соединения
                </ButtonTT>
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
