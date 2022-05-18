import { axios } from "01/axios"
import { ElectricNodeCommercialRegistrationRequestPayload, NodeCommercialRegistrationRequestPayload, unsetElectricNodeCommercialRegistrationRequestPayload, unsetNodeCommercialRegistrationRequestPayload } from "./nodeCommercialRegistrationService.types"

const pathLookUp = {
    pipe: "PipeNodes",
    electric: "ElectricNodes"
}
export const registerPipeNode = (payload: NodeCommercialRegistrationRequestPayload):Promise<void> => {
    return axios.post(`/${pathLookUp[payload.type]}/${payload.nodeId}/SetRegisteredStatus`, payload.data)
}

export const unsetPipeNode = (payload: unsetNodeCommercialRegistrationRequestPayload):Promise<void> => {
    return axios.post(`/${pathLookUp[payload.type]}/${payload.nodeId}/SetNotRegisteredStatus`, payload.data) // поправить запрос для api 
}

// export const registerElectricNode = (payload: ElectricNodeCommercialRegistrationRequestPayload):Promise<void> => {
//     return axios.post(`/ElectricNodes/${payload.electicNodeId}/SetRegisteredStatus`, payload.data)
// }

// export const unsetElectricNode = (payload: unsetElectricNodeCommercialRegistrationRequestPayload):Promise<void> => {
//     return axios.post(`/ElectricNodes/${payload.electricNodeId}/SetNotRegisteredStatus`, payload.data) // поправить запрос для api 
// }