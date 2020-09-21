import React from "react"
import { Route } from "react-router-dom"
import { useGlobalStore } from "store"

export const Header = () => {
  const [{ name }] = useGlobalStore()
  return (
    <header>
      <Route path="/tasks/all/observing">cuda</Route>
      <h1>{name} vu</h1>
    </header>
  )
}
