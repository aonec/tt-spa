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

export async function getArchive(link = '') {
    try {
        const res = await axios.get<string, object>(link, {
            responseType: 'blob',
        })
        return res
    } catch (error) {
        console.log(error)
        throw {
            resource: 'groupReports',
            message: 'Произошла ошибка при загрузке групповых отчетов',
        }
    }
}