import axios from "../../axios";

export async function getReports(id = '') {
    try {
        const res = await axios.get(`Reports`)
        console.log("Reports", res)
        return res
    } catch (error) {
        console.log(error)
        throw {
            resource: 'reports',
            message: 'Произошла ошибка запроса',
        }
    }
}