import _ from 'lodash'

export function handleTabsBeforeFormSubmit(tabErrors, errors) {
    const keys = _.keys(errors)
    if (keys.length > 0) {
        const res = _.find(tabErrors, (item) =>
            item.value.find((x) => keys.includes(x))
        )
        return { hasError: true, errorTab: res.key }
    }
    return { hasError: false, errorTab: null }
}
