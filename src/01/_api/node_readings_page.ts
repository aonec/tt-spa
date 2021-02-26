import axios from "01/axios"
import {ReadingsInterface, ReportType} from "../_pages/Graph/components/GraphView";


delete axios.defaults.headers.common["Authorization"];




export interface QueryInterface {
    nodeId: number
    reportType: ReportType
    from: string
    to: string
}

export interface RequestNodeReadingsFunctionInterface {
    data: ReadingsInterface
    searchQuery: QueryInterface
}




export const requestNodeReadings = async (searchQuery: QueryInterface): Promise<RequestNodeReadingsFunctionInterface> => {

        const readings = await axios.request<any, ReadingsInterface>
        ( {
                method: 'get',
                baseURL: 'http://84.201.132.164:8080/api',
                url: `archivesCalculator/getArchive`,
                params: searchQuery
            }
        )

        return {data: readings, searchQuery}


}