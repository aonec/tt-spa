import axios from '../../../axios'
import {UpdateCalculatorRequest} from "../../../../myApi";

export async function getCalculator(id: number) {
    try {
        const res = await axios.get(`Calculators/${id}`)
        return res
    } catch (error) {
        console.log(error)
        throw {
            resource: 'device',
            message: 'Произошла ошибка запроса Вычислителя',
        }
    }
}

export async function putCalculator(deviceId : number, form: UpdateCalculatorRequest) {
    try {
        const res = await axios.put(`Calculators/${deviceId}`, form)
        alert('Вычислитель успешно изменен!')
        return {res, show: false, id: undefined}
    } catch (error) {
        const handleError = error.response.data.error
        console.log(handleError)
        if (handleError.Code === 'entityAlreadyExists') {
            const {Message} = handleError
            if (Message === null) {
                const id = null
                console.log(handleError.Message)
                return {show: true, id: id}
            }
            const id = parseInt(Message.replace(/[^\d]/g, ''))
            console.log(handleError.Message)
            return {show: true, id: id}
            // alert(`В системе уже есть устройство с совпадающими настройками соединения ${id}`)
        }
        return {show: false, id: undefined}
    }
}


