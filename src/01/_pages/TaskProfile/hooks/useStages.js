export const useStages = ({ stages = {}, panelLoading }, dispatch) => {
  return {
    items: stages.items ?? [],
    revertProps: {
      onClick: () => dispatch({ type: "revert_stage", payload: {} }),
    },
    panelLoading,
  }
}
