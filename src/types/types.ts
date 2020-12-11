export type ReadingType = {
    id: number,
    hasError: boolean,
    status: string,
    statusMessage: string | null,
    value1: string | null,
    value2: string | null,
    value3: string | null,
    value4: string | null,
    readingDate: string,
    uploadTime: string
}

export type ReadingArrayType = Array<ReadingType>

export type ManagementFirmType = {
        id: number,
        name: string,
        phoneNumber: string | null,
        information: string | null,
        timeZoneOffset: string | null
}

export type ReadingDeviceType = {
    closingDate: string | null
    futureCheckingDate: string | null
    futureCommercialAccountingDate: string | null
    homeownerName: string | null
    housingStockNumber: string | null
    id: number
    lastCheckingDate: string | null
    lastCommercialAccountingDate: string | null
    managementFirm: ManagementFirmType
    model: string | null
    mountPlace: string | null
    personalAccountNumber: string | null
    rateType: string | null
    readings: ReadingArrayType
    resource: string | null
    serialNumber: string | null
    transactionType: string | null
}