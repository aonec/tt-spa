import axios from "../axios";

export async function getUser() {
    try {
        const res = await axios.get(`ManagingFirmUsers/current`)
        return res
    } catch (error) {
        console.log(error)
        throw {
            resource: 'roles',
            message: 'Произошла ошибка при загрузке данных пользователя',
        }
    }
}