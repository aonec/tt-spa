import React from "react"
import { Route } from "react-router-dom"
import styled from "reshadow/macro"

import { Loader } from "01/components"
import * as style from "_reshadow"

export const Apartments = React.memo(
  ({ items = [], loading = true, path = null, onClick = () => {} }) => {
    return styled(style.item)`
      item {
        grid-template-columns: 1fr 2fr 0.5fr 0.5fr;
        border-bottom: 1px solid var(--frame);
      }
      apartments {
        display: grid;
      }
      Loader {
        margin: 0 auto;
      }
    `(
      <Route path={path}>
        <apartments>
          <h2>Список квартир</h2>
          <Loader show={loading} size="32" />
          {items.map(
            ({
              id,
              apartmentNumber,
              homeownerName,
              homeownersCount,
              personalAccountNumber,
              square,
            }) => (
              <item onClick={() => onClick(id)} key={id}>
                <h4>{`№ ${apartmentNumber}`}</h4>
                <item_owner>{homeownerName}</item_owner>
                <item_number>{personalAccountNumber}</item_number>
                <item_square>
                  {square ?? "-"} м<sup>2</sup>
                </item_square>
              </item>
            )
          )}
        </apartments>
      </Route>
    )
  }
)
