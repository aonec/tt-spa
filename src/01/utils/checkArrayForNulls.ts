export const isNullInArray = (array: Array<string>): boolean => {
    const nullIndex = array.findIndex((elem) => +elem === 0);
    return nullIndex !== -1
}