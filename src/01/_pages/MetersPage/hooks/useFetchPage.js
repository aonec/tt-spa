import React from "react"
import { useRouteMatch } from "react-router-dom"

import { useCancelFetch } from "01/_hooks/useCancelFetch"
import { getApartmetns, getApartmentInfo } from "../api"

export const useFetchPage = (state, dispatch) => {
  const apatrments = useRouteMatch("/*/apartments")
  const page = useRouteMatch("/meters/:tab/:id")
  useCancelFetch()

  React.useEffect(() => {
    if (apatrments?.isExact && state.params) {
      getApartmetns(state.params).then((data) =>
        dispatch({ type: "success", data })
      )
    }
  }, [state.params, apatrments?.isExact])

  React.useEffect(() => {
    if (page?.isExact) {
      const { id } = page.params
      getApartmentInfo(id).then((data) => dispatch({ type: "success", data }))
    }
  }, [page?.isExact])
}
