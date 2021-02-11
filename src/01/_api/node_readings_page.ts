import axios from "01/axios"
import {ReadingsInterface, ReportType, ResourceType} from "../_pages/Graph/Graph";
// import axios from "axios"

delete axios.defaults.headers.common["Authorization"];




type RequestNodeReadingsFunctionInterface = (deviceId: number, reportType: ReportType, resource: ResourceType, from: string, to: string) => Promise<ReadingsInterface>

export const requestNodeReadings: RequestNodeReadingsFunctionInterface = (deviceId, reportType, resource, from, to) => {
    const readings = axios.request<any, ReadingsInterface>
    ( { method: 'get',
        baseURL: 'http://84.201.132.164:8080/api',
        url: `archivesCalculator/getArchives?deviceId=${deviceId}&reportType=${reportType}&resourceType=${resource}&entrynumber=1&pipenumber=5&from=${from}&to=${to}`
         })
    return readings
}