import { useEffect } from "react"
import { request } from "services/api"

export const useGetState = (config = {}, dispatch, triger = []) => {

    useEffect(() => {
        if (config.url) {

            request(config).then(data => dispatch({ type: 'get_state_success', payload: { ...data, loading: false } }))
        }

    }, triger)
}