import { axios } from "01/axios"
import { NodeCommercialRegistrationRequestPayload } from "./nodeCommercialRegistrationService.types"


export const registerNode = (payload: NodeCommercialRegistrationRequestPayload):Promise<void> => {
    return axios.post(`/PipeNodes/${payload.pipeNodeId}/AddAdmissionAct`, payload.data)
}