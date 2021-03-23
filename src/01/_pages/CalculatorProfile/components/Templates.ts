export const DEFAULT_BUILDING = {
    city: '',
    street: '',
    housingStockNumber: '',
    corpus: '',
    id: null
}

export const DEFAULT_DEVICE = {
    model: '',
    serialNumber: '',
    resource: '',
    commercialAccountingDate: '',
    futureCheckingDate: '',
    lastCheckingDate: '',
    futureCommercialAccountingDate: '',
    lastCommercialAccountingDate: '',
    isConnected: false,
    connection: {
        ipV4: '',
        port: null,
        deviceAddress: null,
    }

}

export const DEFAULT_ICON = {
    icon: 'device',
    color: 'initial',
}

export const typelList = [
    { label: 'Холодная вода', value: 'coldwatersupply' },
    { label: 'Горячая вода', value: 'heat' },
]
