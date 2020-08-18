export default (state, action) => {
  const { focus, items, multiple, defaultId } = state
  const limit = items.length - 1
  switch (action.type) {
    case "open":
      return { ...state, open: action.payload }
    case "key_down":
      const down = focus === null ? 0 : focus === limit ? 0 : focus + 1
      return { ...state, focus: down }
    case "key_up":
      const up = focus === null ? limit : focus === 0 ? limit : focus - 1
      return { ...state, focus: up }
    case "key_check":
      const itemId = focus === null ? null : items[focus].id
      const itemsPressed = itemId ? checkedArr(items, itemId, multiple) : items
      return {
        ...state,
        focus: focus ?? 0,
        items: itemsPressed,
        open: multiple,
      }
    case "click_check":
      return {
        ...state,
        items: checkedArr(items, action.payload.id, multiple),
        focus: action.payload.index,
        open: multiple,
      }
    case "update":
      const { options } = action.payload
      return {
        ...state,
        items: options.map((item) => ({
          ...item,
          checked: defaultId.includes(item.id),
        })),
      }

    default:
      console.warn("action type ==> ", action.type)
      return state
  }
}

function checkedArr(arr, id, multiple) {
  return arr.reduce((arr, item) => {
    if (multiple) {
      return item.id === id
        ? [...arr, { ...item, checked: !item.checked }]
        : [...arr, item]
    } else {
      return [...arr, { ...item, checked: item.id === id }]
    }
  }, [])
}
