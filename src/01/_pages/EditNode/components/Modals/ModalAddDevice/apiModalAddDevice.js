import axios from "../../../../../axios";

export async function addOdpu(form) {
    try {
        const res = await axios.post('HousingMeteringDevices', form);
        alert('ОДПУ успешно создан !');
        return res;
    } catch (error) {
        console.log(error);
        throw {
            resource: 'device',
            message: 'Произошла ошибка добавления ОДПУ',
        };
    }
}