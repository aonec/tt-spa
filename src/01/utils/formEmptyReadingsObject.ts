export const formEmptyReadingsObject = (numberOfReadings:number):Object => {
    const emptyObject:any = {}
    for (let i=1; i<=numberOfReadings; i++) {
        emptyObject[`value${i}`] = "0";
    }
    return emptyObject
}