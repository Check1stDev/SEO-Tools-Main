import axios from "axios";

const submitKeywords = async (id: number, keywords: string[]) => {
    const result = await axios.post(`http://localhost:3000/projects/${id}/lemmas`, keywords)
    return result.data 
}

export { submitKeywords }