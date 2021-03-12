import React, { useContext } from 'react'
import { Modal } from 'antd'
import ModalDeregisterForm from './ModalDeregisterForm'
import { HousingContext } from '../../../HousingProfile'

const DeregisterDevice = () => {
    const { deregister, setDeregister, device } = useContext(HousingContext)
    const handleCancel = () => {
        setDeregister(false)
    }

    if (device) {
        return (
            <Modal
                visible={deregister}
                height={488}
                width={800}
                footer={null}
                onCancel={handleCancel}
            >
                <ModalDeregisterForm
                    handleCancel={handleCancel}
                    device={device}
                />
            </Modal>
        )
    }

    return <div>ЗАГРУЗКА ДАННЫХ</div>
}

export default DeregisterDevice
