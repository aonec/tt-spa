import React, { useContext } from 'react'
import ModalCalculatorReportForm from './ModalCalculatorReportForm'
import { DeviceContext } from '../../../CalculatorProfile'
import ModalSonoSafeReportForm, { App } from './ModalSonoSafeReportForm'
import { StyledModal } from '../../../../../tt-components'

export const ModalCalculatorReport = () => {
    const { report, setReport, device } = useContext(DeviceContext)

    const handleCancel = () => {
        setReport(false)
    }

    // return (
    //     <StyledModal
    //           visible={report}
    //           // visible
    //           width={800}
    //           footer={null}
    //           onCancel={handleCancel}
    //         >
    //           <ModalCalculatorReportForm device={device} handleCancel={handleCancel} />
    //         </StyledModal>
    //
    // )

    if (device.infoId !== 10) {
        return (
            <StyledModal
                visible={report}
                // visible
                width={800}
                footer={null}
                onCancel={handleCancel}
            >
                <ModalCalculatorReportForm
                    device={device}
                    handleCancel={handleCancel}
                />
            </StyledModal>
        )
    }

    return (
        <StyledModal
            visible={report}
            // visible
            width={800}
            footer={null}
            onCancel={handleCancel}
        >
            <ModalSonoSafeReportForm
                device={device}
                handleCancel={handleCancel}
            />
        </StyledModal>
    )
}

export default ModalCalculatorReport
