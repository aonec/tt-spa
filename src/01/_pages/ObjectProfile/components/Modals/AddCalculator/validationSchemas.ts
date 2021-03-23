import * as Yup from 'yup'
import { ipv4RegExp } from '../../../../../tt-components/localBases'

export const defaultValidationSchema = Yup.object({
    serialNumber: Yup.string().required('Введите серийный номер'),
    ipV4: Yup.string()
        .matches(ipv4RegExp, 'Укажите в формате X.X.X.X')
        .required('Введите IP-адрес устройства'),
    deviceAddress: Yup.number()
        .nullable()
        .required('Введите сетевой адрес устройства'),
    port: Yup.number().nullable().required('Введите порт устройства'),
})

export const emptyConnectionValidationSchema = Yup.object({
    serialNumber: Yup.string().required('Введите серийный номер'),
})
