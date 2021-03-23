import {
    CalculatorListResponse,
    HousingStockAddressResponse
} from '../../../../../myApi'

export const groupDevicesByObjects = (
    devices: CalculatorListResponse[] | null
): DevicesByAddressInterface[] => {
    const devicesByObject: DevicesByAddressInterface[] = []
    if (!devices) return []
    devices.forEach((device) => {
        if (!device.address) {
            devicesByObject.push({ devices: [{ ...device }] })
            return
        }
        const { address, ...rest } = device
        const index = devicesByObject.findIndex(
            (el) => el.address?.id === address?.id
        )
        if (index === -1) {
            devicesByObject.push({ address, devices: [{ ...rest }] })
        } else {
            devicesByObject[index].devices?.push({ ...rest })
        }
    })
    return devicesByObject
}

export interface DevicesByAddressInterface {
    devices: Omit<CalculatorListResponse, "address">[] | null
    address?: HousingStockAddressResponse
}

interface ManagementFirmInterface {
    id: number
    name: string
    phoneNumber: string | null
    information: string | null
    timeZoneOffset: string
}

export interface CommunicationPipeInterface {
    devices: DeviceInterface[]
    entryNumber: number
    hubNumber: number | null
    id: number
    magistral: string
    number: number
}

export interface DeviceInterface {
    closingDate: string | null
    diameter: string
    futureCheckingDate: string | null
    futureCommercialAccountingDate: string | null
    housingMeteringDeviceType: string
    hub: HubInterface
    id: number
    lastCheckingDate: string | null
    lastCommercialAccountingDate: string | null
    managementFirm: ManagementFirmInterface
    model: string
    resource: string
    serialNumber: string
}

interface HubInterface {
    entryNumber: number
    hubNumber: number | null
    pipeNumber: number
    magistral: string
}
