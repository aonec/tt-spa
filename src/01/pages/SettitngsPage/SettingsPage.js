import React from "react"
import styled from "reshadow/macro"

import { HeaderBlock } from "01/components/HeaderBlock"
import { TabsBlock } from "01/components/TabsBlock"
import { useSettingsPage } from "./useSettingsPage"
import { Company } from "./Company"
import { UsCtrList } from "./UsCtrList"
import { CurrentUser } from "./CurrentUser"

export const SettingsPage = () => {
  const {
    path,
    managementCompany = {},
    contractors = [],
    users = [],
    currentUser = {},
  } = useSettingsPage()
  return styled()`
    HeaderBlcok {
      grid-row: 1;
    }
  `(
    <>
      <HeaderBlock title="Настройки" />
      <TabsBlock />
      <Company {...managementCompany} />
      <UsCtrList users={users} contractors={contractors} />
      <CurrentUser {...currentUser} />
    </>
  )
}
