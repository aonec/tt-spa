import axios from "../../axios";
import {GroupReportFormResponse} from "../../../myApi";

export async function getReports() {
    try {
        const res = await axios.get<any, GroupReportFormResponse>(`Reports`)
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