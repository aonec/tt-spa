import {ipv4RegExp} from "../../../tt-components/localBases";
import * as Yup from 'yup';

const yupDate = Yup.date().typeError('Поле обязательное').required('Поле обязательное');
const yupSerialNumber = Yup.string().required('Введите серийный номер');
const yupInfoId = Yup.number().typeError('Выберите модель').required('Выберите модель');




// number,
//     nodeStatus,
//     nodeResourceType,
//     serviceZone,
//     lastCommercialAccountingDate: values.lastCommercialAccountingDate.toISOString(),
//     futureCommercialAccountingDate: values.futureCommercialAccountingDate.toISOString(),

export const defaultValidationSchema = Yup.object({
    lastCommercialAccountingDate: yupDate,
    futureCommercialAccountingDate: yupDate,
    number: Yup.number().typeError('Укажите номер').required('Укажите номер'),
    nodeStatus: Yup.string().required('Укажите статус'),
    nodeResourceType:Yup.string().required('Укажите тип ресура'),
    serviceZone: Yup.string().required('Укажите зону')
});

// export const defaultValidationSchema = Yup.object({
//     lastCheckingDate: yupDate,
//     futureCheckingDate: yupDate,
//     lastCommercialAccountingDate: yupDate,
//     futureCommercialAccountingDate: yupDate,
//     serialNumber: yupSerialNumber,
//     ipV4: Yup.string().matches(ipv4RegExp, 'Укажите в формате X.X.X.X').required('Введите IP-адрес устройства'),
//     deviceAddress: Yup.number().nullable().required('Введите сетевой адрес устройства'),
//     port: Yup.number().nullable().required('Введите порт устройства'),
//     infoId: yupInfoId,
// });
//
// export const emptyConnectionValidationSchema = Yup.object({
//     lastCheckingDate: yupDate,
//     futureCheckingDate: yupDate,
//     lastCommercialAccountingDate: yupDate,
//     futureCommercialAccountingDate: yupDate,
//     serialNumber: yupSerialNumber,
//     infoId: yupInfoId,
// });

