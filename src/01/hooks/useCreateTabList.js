import React from "react"
import tabsObj from "01/tabs.json"
import { useRouteMatch } from "react-router-dom"

export const useCreateTabList = (tabs = "") => {
  const { url } = useRouteMatch()
  return React.useMemo(() => createList(tabsObj[tabs], url), [url, tabs])
}

function createList(tabs, url) {
  return tabs.map((tab) => ({ ...tab, to: `${url}${tab.to}` }))
}
