import { axios } from "01/axios"
import { NodeCommercialRegistrationRequestPayload, unsetNodeCommercialRegistrationRequestPayload } from "./nodeCommercialRegistrationService.types"


export const registerNode = (payload: NodeCommercialRegistrationRequestPayload):Promise<void> => {
    return axios.post(`/PipeNodes/${payload.pipeNodeId}/AddAdmissionAct`, payload.data)
}

export const unsetNode = (payload: unsetNodeCommercialRegistrationRequestPayload):Promise<void> => {
    return axios.post(`/PipeNodes/${payload.pipeNodeId}/?`, payload.data) // поправить запрос для api 
}