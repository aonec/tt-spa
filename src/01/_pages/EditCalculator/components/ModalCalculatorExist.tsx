import {
    ButtonTT,
    Header,
    StyledFooter,
    StyledModal,
    StyledModalBody,
    Title,
} from '../../../tt-components'
import React, {Dispatch, SetStateAction, useContext} from 'react'

import {Link} from 'react-router-dom'

interface ModalCalculatorExistInstance {
    existCalculator: number | undefined | null
    setExistCalculator: Dispatch<SetStateAction<number | undefined | null>>
    visible: boolean
    setVisible: Dispatch<SetStateAction<boolean>>
}

export const ModalCalculatorExist = ({
                                         existCalculator,
                                         setExistCalculator,
                                         visible,
                                         setVisible
                                     }: ModalCalculatorExistInstance) => {

    function handleCancel() {
        setVisible(false)
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
                <Header>
                    В системе уже есть устройство с совпадающими настройками
                    соединения
                </Header>
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
                    style={{marginLeft: 16}}
                    onClick={handleCancel}
                >
                    Изменить настройки соединения
                </ButtonTT>
            </StyledFooter>
        </StyledModal>
    )
}

export default ModalCalculatorExist
