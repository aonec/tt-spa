import * as Yup from 'yup';

export const addNodeValidationSchema = Yup.object({
    resource: Yup.string().required('Укажите тип ресура'),
    number: Yup.number().typeError('Укажите номер').required('Укажите номер'),
    serviceZone: Yup.string().required('Укажите зону'),
    nodeStatus: Yup.string().required('Укажите статус'),
});

export const calculatorValidationSchema = Yup.object({
    isConnected: Yup.boolean(),
    calculatorId: Yup.number().typeError('Выберите вычислитель').required('Выберите вычислитель'),
    entryNumber: Yup.number().typeError('Выберите номер ввода').required('Выберите номер ввода'),
});
