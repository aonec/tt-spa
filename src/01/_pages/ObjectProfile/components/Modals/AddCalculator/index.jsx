import React, { useContext, useState } from 'react'
import '../../../../../tt-components/antd.scss'
import { ObjectContext } from '../../../tsx'
import AddCalculatorForm from './AddCalculatorForm'
import { StyledModal } from '../../../../../tt-components'
import ModalCalculatorExist from './ModalCalculatorExist'

export const AddCalculatorContext = React.createContext()

const ModalCalculator = () => {
    const { addCalculator, setAddCalculator, housingStockId } = useContext(
        ObjectContext
    )
    const handleCancel = () => {
        setAddCalculator(false)
    }
    const [alertVisible, setAlertVisible] = useState(false)
    const [existCalculator, setExistCalculator] = useState(null)

    const context = {
        alertVisible,
        setAlertVisible,
        existCalculator,
        setExistCalculator,
    }

    return (
        <>
            <AddCalculatorContext.Provider value={context}>
                <StyledModal
                    visible={addCalculator}
                    // visible
                    onCancel={handleCancel}
                    footer={null}
                    width={800}
                >
                    <AddCalculatorForm
                        housingStockId={housingStockId}
                        addCalculator={addCalculator}
                        setAddCalculator={setAddCalculator}
                        handleCancel={handleCancel}
                    />
                </StyledModal>
                <ModalCalculatorExist />
            </AddCalculatorContext.Provider>
        </>
    )
}

export default ModalCalculator
