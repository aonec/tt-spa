import React, { useContext } from 'react'
import ModalAddStaffForm from './ModalAddStaffForm'
import { SettingsContext } from '../../../index'
import { StyledModal } from '../../../../../tt-components'

export const ModalAddStaff = () => {
    const { staff, setStaff, hideStaff } = useContext(SettingsContext)

    return (
        <StyledModal
            visible={staff}
            width={800}
            footer={null}
            onCancel={hideStaff}
        >
            <ModalAddStaffForm />
        </StyledModal>
    )
}

export default ModalAddStaff
