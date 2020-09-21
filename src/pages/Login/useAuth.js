import { useEffect, useState, useReducer } from "react"
import { useHistory } from "react-router-dom"

export const useAuth = () => {
  const { replace } = useHistory()
  const [postData, setPostData] = useState(null)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    postData && auth(postData)
  }, [postData])

  async function auth(data) {
    setLoading(true)
    try {
      const res = await fetch(process.env.REACT_APP_URL + "/Auth/login", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const {
        successResponse: { roles, ...tokenData },
      } = await res.json()
      localStorage.setItem("tokenData", JSON.stringify(tokenData))
      localStorage.setItem("roles", JSON.stringify(roles))
      replace("/")
    } catch (err) {
      // window.alert("Неправильный логин или пароль")
      setLoading(false)
    }
  }

  return { submit: (data) => setPostData(data), loading }
}
