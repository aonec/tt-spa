import {HousingMeteringDeviceListResponse} from "../../../../../myApi";

export const groupDevicesByObjects = (devices: CalculatorsInterfaceFull[]): DevicesByAddressInterface[] => {
    const devicesByObject: DevicesByAddressInterface[] = [];
    devices.forEach((device) => {
        if (!device.address) {
            devicesByObject.push({ devices: [{ ...device }] });
            return;
        }
        const { address, ...rest } = device;
        const index = devicesByObject.findIndex((el) => el.address?.id === address?.id);
        if (index === -1) {
            devicesByObject.push({ address, devices: [{ ...rest }] })
        } else {
            devicesByObject[index].devices.push({ ...rest });
        }
    });
    return devicesByObject
}

export interface DevicesByAddressInterface {
    devices: CalculatorsInterface[]
    address?: AddressInterface
}

export interface CalculatorsInterface {
    closingDate: string | null
    connection: ConnectionInterface
    futureCheckingDate: string | null
    futureCommercialAccountingDate: string | null
    hasTasks: boolean
    hubs: HousingMeteringDeviceListResponse[] | null
    id: boolean
    isConnected: boolean
    lastCheckingDate: string | null
    lastCommercialAccountingDate: string | null
    managementFirm : ManagementFirmInterface
    model: string
    nodes: NodeInterface[]
    serialNumber: string
    transactionType: string | null
}

interface CalculatorsInterfaceFull extends CalculatorsInterface {
    address: AddressInterface
}

// interface CalculatorsInterface {
//     address?: AddressInterface
//     closingDate: string | null
//     connection: ConnectionInterface
//     futureCheckingDate: string | null
//     futureCommercialAccountingDate: string | null
//     hasTasks: boolean
//     hubs: any
//     id: boolean
//     isConnected: boolean
//     lastCheckingDate: string | null
//     lastCommercialAccountingDate: string | null
//     managementFirm : ManagementFirmInterface
//     model: string
//     nodes: NodeInterface[]
//     serialNumber: string
//     transactionType: any
// }

interface AddressInterface {
    id: number
    city: string
    street: string
    housingStockNumber: string
    corpus: null | string
}

interface ConnectionInterface {
    ipV4: string
    port: null | number
    deviceAddress: string
}

interface ManagementFirmInterface {
    id: number
    name: string
    phoneNumber: string | null
    information: string | null
    timeZoneOffset: string
}

interface NodeInterface {
    calculatorId: number
    communicationPipes: CommunicationPipeInterface[]
    futureCommercialAccountingDate: string
    id: number
    lastCommercialAccountingDate: string
    nodeStatus: string
    number: number
    resource: string
    serviceZone: string
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


