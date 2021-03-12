interface ObjectInterface {
    numberOfTasks: number
    street: string
    number: string
}

const getRealHouseNumber = (houseNumber: string) => {
    if (houseNumber.includes('/')) return houseNumber.split('/')[0]
    if (houseNumber.includes(' ')) return houseNumber.split(' ')[0]
    return houseNumber
}

export const sortObjects = (a: ObjectInterface, b: ObjectInterface): number => {
    if (a.numberOfTasks === b.numberOfTasks) {
        if (a.street === b.street) {
            return +getRealHouseNumber(a.number) -
                +getRealHouseNumber(b.number) <
                0
                ? -1
                : +getRealHouseNumber(a.number) -
                      +getRealHouseNumber(b.number) >
                  0
                ? 1
                : 0
        } else {
            return a.street < b.street ? -1 : 1
        }
    } else {
        return a.numberOfTasks > b.numberOfTasks ? -1 : 1
    }
}
