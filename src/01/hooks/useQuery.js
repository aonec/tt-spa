import { useLocation } from "react-router-dom"

export const useQuery = () => {
  const { search } = useLocation()
  const query = new URLSearchParams(search)
  return query 
}
