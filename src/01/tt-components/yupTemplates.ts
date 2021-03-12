import * as Yup from 'yup'

export const yupDate = Yup.string().required('Поле обязательное')
export const yupDeviceId = Yup.number().required('Не передан ИД устройства')

export const editNodeValidationSchema = Yup.object({
    resource: Yup.string().required('Укажите тип ресура'),
    number: Yup.number()
        .max(5, 'Число должно быть не длиннее 5 знаков')
        .typeError('Ошибка типа: Укажите число')
        .required('Укажите номер'),
    nodeStatus: Yup.string().required('Укажите статус'),
    serviceZone: Yup.string().required('Укажите зону'),
    lastCommercialAccountingDate: yupDate,
    futureCommercialAccountingDate: yupDate,
})
