import React from "react"
import { useHistory, useRouteMatch } from "react-router-dom"

export const useAuthCheck = ({ isAuth }) => {
  const login = useRouteMatch("/auth/login")

  const { replace } = useHistory()
  React.useEffect(() => {
    // console.log("auth", isAuth, "loign", login)
    // if (!isAuth) return replace("/auth/login")
    // if (isAuth && login?.isExact) return replace("/tasks")
    // eslint-disable-next-line
  }, [isAuth])
}
