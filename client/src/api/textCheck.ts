import axios from "axios";

type AllKeywords = {
            main:  string[],
            lsi: string[],
            highlight: string[]
        }

const submitCheckText = async (text: string, keywords: AllKeywords) => {
    const result = await axios.post(`http://localhost:3000/searchKeys`, {text, keywords})
    return result.data 
}
export { submitCheckText }