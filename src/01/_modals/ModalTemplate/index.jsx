import React from 'react'
import { Modal } from 'antd'
import { ButtonTT } from '../../tt-components'
import ModalTemplateForm from './ModalTemplateForm'

const ModalTemplate = () => {
    const handleCancel = () => {
        setModalTemplateVisible(false)
    }

    return (
        <Modal visible={visible} onCancel={handleCancel} footer={null}>
            <ModalTemplateForm handleCancel={handleCancel} />
        </Modal>
    )
}
export default ModalTemplate
