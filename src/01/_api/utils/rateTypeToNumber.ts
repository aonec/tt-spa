const rateTypeToNumber = (rateType: string): number => {
    switch (rateType) {
        case 'OneZone':
            return 1
        case 'TwoZone':
            return 2
        case 'ThreeZone':
            return 3
        case 'FourZone':
            return 4
        default:
            return 0
    }
}

export default rateTypeToNumber
