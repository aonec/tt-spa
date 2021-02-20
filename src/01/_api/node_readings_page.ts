import axios from "01/axios"
import {ReadingsInterface, ReportType, ResourceType} from "../_pages/Graph/components/GraphView";
import {serialize} from "v8";
// import axios from "axios"

delete axios.defaults.headers.common["Authorization"];




export interface RequestNodeReadingsFunctionInterface {
    nodeId: number
    reportType: ReportType
    from: string
    to: string
}

// http://84.201.132.164:8080/api/archivesCalculator/getArchive?nodeId=1935&reportType=daily&from=2021-01-20T00:00:00Z&to=2021-02-10T23:00:00Z

// export const requestNodeReadings: RequestNodeReadingsFunctionInterface = (searchQuery) => {
export const requestNodeReadings = (searchQuery: RequestNodeReadingsFunctionInterface): Promise<ReadingsInterface> => {
    // const readings = axios.request<any, ReadingsInterface>

        const readings = axios.request<any, ReadingsInterface>
        ( {
                method: 'get',
                baseURL: 'http://84.201.132.164:8080/api',
                // url: `archivesCalculator/getArchive?deviceId=${deviceId}&reportType=${reportType}&resourceType=${resource}&entrynumber=1&pipenumber=5&from=${from}&to=${to}`
                url: `archivesCalculator/getArchive`,
                params: searchQuery
            }
        )

        return readings


}