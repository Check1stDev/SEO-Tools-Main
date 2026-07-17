import axios from "axios";

const submitKeywords = async (keywords: string[]) => {
    const result = await axios.post(`http://localhost:3000/lemmas`, keywords)
    return result.data 
}

const submitKeywordsMap = async (keywords: Record<string, string[]>) => {
    const result = await axios.post(`http://localhost:3000/lemmas/map`, keywords)
    return result.data 
}

export { submitKeywords, submitKeywordsMap }