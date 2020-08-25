import axios from "01/axios"
const URL = "HousingStocks"

const replaceURL = (url = "") => url.replace(/objects/, URL)

export async function getInfo(url = "") {
    try {
        const res = await axios.get(replaceURL(url))
        return { ...res, info: true, header: createTitleObject(res) }
    } catch (error) { }
}

const TasksURL = "Tasks";
const replaceURLTasks = (url = "") => url.replace(/objects/, TasksURL)
export async function getTasks(url = "1306857") {
    try {
        //const res = await axios.get(replaceURL2(url))
        const res = await axios.get(TasksURL)
        return { ...res }
    } catch (error) { }
}

const URL2 = "Apartments"
const replaceURL2 = (url = "") => url.replace(/objects/, URL2)
export async function getApartment(url = "1306857") {
    try {
        //const res = await axios.get(replaceURL2(url))
        const res = await axios.get("Apartments/1306857")
        // return { ...res, info: true, header: createTitleObject(res) }
        return { ...res }
    } catch (error) { }
}

// utils
function createTitleObject(data) {
    const { street, number, city } = data
    return [`${street}, ${number}`, city]
}
