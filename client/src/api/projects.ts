import axios from "axios";

const getProjects = async () => {
    const result = await axios.get('http://localhost:3000/projects')
    return result.data 
}

export {getProjects}