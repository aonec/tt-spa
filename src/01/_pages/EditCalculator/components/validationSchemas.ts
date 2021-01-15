import {ipv4RegExp} from "../../../tt-components/localBases";
import * as Yup from 'yup';

const yupDate = Yup.date().typeError('Поле обязательное').required('Поле обязательное');
const yupSerialNumber = Yup.string().required('Введите серийный номер');
const yupInfoId = Yup.number().typeError('Выберите модель').required('Выберите модель');

export const defaultValidationSchema = Yup.object({
    lastCheckingDate: yupDate,
    futureCheckingDate: yupDate,
    lastCommercialAccountingDate: yupDate,
    futureCommercialAccountingDate: yupDate,
    serialNumber: yupSerialNumber,
    ipV4: Yup.string().matches(ipv4RegExp, 'Укажите в формате X.X.X.X').required('Введите IP-адрес устройства'),
    deviceAddress: Yup.number().nullable().required('Введите сетевой адрес устройства'),
    port: Yup.number().nullable().required('Введите порт устройства'),
    infoId: yupInfoId,
});

export const emptyConnectionValidationSchema = Yup.object({
    lastCheckingDate: yupDate,
    futureCheckingDate: yupDate,
    lastCommercialAccountingDate: yupDate,
    futureCommercialAccountingDate: yupDate,
    serialNumber: yupSerialNumber,
    infoId: yupInfoId,
});


// const defaultValidationSchema = Yup.object({
//     lastCheckingDate: Yup.date().typeError('Поле обязательное').required('Поле обязательное'),
//     futureCheckingDate: Yup.date().typeError('Поле обязательное').required('Поле обязательное'),
//     lastCommercialAccountingDate: Yup.date().typeError('Поле обязательное').required('Введите серийный номер'),
//     futureCommercialAccountingDate: Yup.date().typeError('Поле обязательное').required('Введите серийный номер'),
//     serialNumber: Yup.string().required('Введите серийный номер'),
//     ipV4: Yup.string().matches(ipv4RegExp, 'Укажите в формате X.X.X.X').required('Введите IP-адрес устройства'),
//     deviceAddress: Yup.number().nullable().required('Введите сетевой адрес устройства'),
//     port: Yup.number().nullable().required('Введите порт устройства'),
//     infoId: Yup.number().typeError('Выберите модель').required('Выберите модель'),
// });
//
// const emptyValidationSchema = Yup.object({
//     lastCheckingDate: Yup.date().typeError('Поле обязательное').required('Поле обязательное'),
//     futureCheckingDate: Yup.date().typeError('Поле обязательное').required('Поле обязательное'),
//     lastCommercialAccountingDate: Yup.date().typeError('Поле обязательное').required('Введите серийный номер'),
//     futureCommercialAccountingDate: Yup.date().typeError('Поле обязательное').required('Введите серийный номер'),
//     serialNumber: Yup.string().required('Введите серийный номер'),
//     infoId: Yup.number().typeError('Выберите модель').required('Выберите модель'),
// });