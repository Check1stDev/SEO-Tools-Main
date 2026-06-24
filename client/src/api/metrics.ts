import axios from "axios";

const getMetrics = async (id: number) => {
    const result = await axios.get(`http://localhost:3000/projects/${id}/metrics`)
    return result.data 
}

export { getMetrics }