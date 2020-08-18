import axios from "01/axios"

const formData = new FormData()
export async function uploadFile(file, type = "AdditionalMaterials") {
  formData.append("type", type)
  formData.append("file", file)
  try {
    const res = await axios.post("documents/upload", formData)
    return { newFile: res[0] }
  } catch (error) {}
}
