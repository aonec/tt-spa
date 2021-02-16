import * as Yup from 'yup';

const yupDate = Yup.date().typeError('Поле обязательное').required('Поле обязательное');
const yupSerialNumber = Yup.string().required('Введите серийный номер');
const yupInfoId = Yup.number().typeError('Выберите модель').required('Выберите модель');

export const editNodeValidationSchema = Yup.object({
    resource:Yup.string().required('Укажите тип ресура'),
    number: Yup.number().max(5, 'Число должно быть не длиннее 5 знаков').typeError('Ошибка типа: Укажите число').required('Укажите номер'),
    nodeStatus: Yup.string().required('Укажите статус'),
    serviceZone: Yup.string().required('Укажите зону'),
    lastCommercialAccountingDate: yupDate,
    futureCommercialAccountingDate: yupDate,
});


