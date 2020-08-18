import React from "react"
import styled from "reshadow/macro"

import { Page } from "01/components/Page"
import { Tabs } from "01/components/Tabs"

import { useCreateTabList } from "01/hooks/useCreateTabList"

export const ApartmentId = () => {
  const tabs = useCreateTabList("deviceId", "/objects/")
  return styled()`
    Page {
      grid-template-areas:
        "h h"
        "t t"
        ". e";
    }
    h1 {
      grid-area: h;
    }

    Tabs {
      grid-area: t;
    }
  `(
    <Page>
      <h1>ApartmentId</h1>
      <Tabs list={tabs} />
    </Page>
  )
}
