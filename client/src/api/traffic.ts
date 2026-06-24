import axios from "axios";

const getTraffic = async (id: number) => {
    const result = await axios.get(`http://localhost:3000/projects/${id}/traffic`)
    return result.data 
}

export { getTraffic }