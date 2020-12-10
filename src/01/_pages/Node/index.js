import React, { createContext } from 'react';
import Header from "./components/Header";

export const NodeContext = createContext();
export const Node = () => {
  console.log("Node")

  const device = {

  }
  const context = {
    device
  }
  return (
    <NodeContext.Provider value={context}>
      <Header />
    </NodeContext.Provider>
  )
}
export default Node;