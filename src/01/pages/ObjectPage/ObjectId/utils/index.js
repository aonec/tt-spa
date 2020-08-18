export function createObjHeader(data) {
  if (!data) return null
  const { street, number, city } = data
  return {
    title: `${street}, ${number}`,
    city,
  }
}
