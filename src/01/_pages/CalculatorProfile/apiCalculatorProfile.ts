import axios from '../../axios'

export async function getCalculator(id = '') {
    try {
        const res = await axios.get(`Calculators/${id}`)
        return res
    } catch (error) {
        console.log(error)
        throw {
            resource: 'device',
            message: 'Произошла ошибка запроса устройства',
        }
    }
}

export async function getCalculatorTasks(id = '') {
    try {
        const res = await axios.get(`Tasks?GroupType=2&DeviceId=${id}`)
        return res
    } catch (error) {
        console.log(error)
        throw {
            resource: 'tasks',
            message: 'Произошла ошибка при загрузке данных по задачам',
        }
    }
}

//0 - Executing
//1 - Observing
//2 - Not Archived
//3 - Archived
