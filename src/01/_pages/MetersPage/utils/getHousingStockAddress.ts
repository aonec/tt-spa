import { HousingStockListResponse } from "myApi";

export const getHousingStockAddress = (apartmentNumber: number, housingStock: HousingStockListResponse ) => {
    const isEmpty = !apartmentNumber || !housingStock.address?.mainAddress;
    
    if(isEmpty) return '';

    const { street, number, corpus } = housingStock?.address?.mainAddress!;

    return `${street}, ${number} ${corpus || ''}, кв.${apartmentNumber}`;
}