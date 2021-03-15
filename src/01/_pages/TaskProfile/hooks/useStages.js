export const useStages = ({ stages = {}, panelLoading }, dispatch) => {
    console.log(stages.items)
    return {
        items: stages.items ?? [],
        revertProps: {
            onClick: () => dispatch({ type: 'revert_stage', payload: {} }),
        },
        panelLoading,
    }
}
