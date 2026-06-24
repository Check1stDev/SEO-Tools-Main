import axios from "axios";

const getKeywords = async (id: number) => {
    const result = await axios.get(`http://localhost:3000/projects/${id}/keywords`)
    return result.data 
}

export { getKeywords }