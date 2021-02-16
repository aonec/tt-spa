import axios from "01/axios"
import {ReadingsInterface, ReportType, ResourceType} from "../_pages/Graph/Graph";
import {serialize} from "v8";
// import axios from "axios"

delete axios.defaults.headers.common["Authorization"];




interface RequestNodeReadingsFunctionInterface {
    deviceId: number
    reportType: ReportType
    resource: ResourceType
    from: string
    to: string
}



// export const requestNodeReadings: RequestNodeReadingsFunctionInterface = (searchQuery) => {
export const requestNodeReadings = (searchQuery: RequestNodeReadingsFunctionInterface): Promise<ReadingsInterface> => {
    // const readings = axios.request<any, ReadingsInterface>

        const readings = axios.request<any, ReadingsInterface>
        ( {
                method: 'get',
                baseURL: 'http://84.201.132.164:8080/api',
                // url: `archivesCalculator/getArchives?deviceId=${deviceId}&reportType=${reportType}&resourceType=${resource}&entrynumber=1&pipenumber=5&from=${from}&to=${to}`
                url: `archivesCalculator/getArchives`,
                params: {deviceId: searchQuery.deviceId, from: searchQuery.from, to: searchQuery.to, reportType: searchQuery.reportType, entrynumber: 1, pipenumber: 5, resourceType: searchQuery.resource }
            }
        )

        return readings


}