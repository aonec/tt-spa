const transformDate = (date) => {
    if (date === null) return null
    return new Date(date).toLocaleDateString()
}

export default transformDate
