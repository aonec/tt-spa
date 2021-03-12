import React, { useEffect, useState } from 'react'
import ModalCalculatorDeregisterForm from './ModalCalculatorDeregisterForm'
import { getCalculator } from './apiDeregisterDevice'
import { StyledModal } from '../../../../../tt-components/Modal'

const ModalCalculatorDeregister = (props) => {
    const { visible, id, setVisible } = props

    const [device, setDevice] = useState()

    useEffect(() => {
        getCalculator(id).then((res) => {
            setDevice(res)
        })
    }, [])

    const handleCancel = () => {
        setVisible(false)
    }

    if (!device) {
        return <div>Загрузка</div>
    }
    return (
        <StyledModal
            visible={visible}
            height={488}
            width={800}
            footer={null}
            onCancel={handleCancel}
        >
            <ModalCalculatorDeregisterForm
                handleCancel={handleCancel}
                {...props}
                device={device}
            />
        </StyledModal>
    )
}

export default ModalCalculatorDeregister
