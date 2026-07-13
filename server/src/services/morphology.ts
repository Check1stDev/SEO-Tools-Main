import phpMorphy from 'phpmorphy'

const morphy = new phpMorphy('ru')

type arrLemma = string[]

type LemmaItem = {
    word: string
    lemma: string
}

type morphyArrItem = [string,string[]]

const normalizeWords = (arr: arrLemma) => {
    const morphyObj = morphy.lemmatize(arr)
    const morphyArr = Object.values(morphyObj) as string[][]
    const result = morphyArr.map((word,index) => {
        if (!word[0]) {
            return arr[index]
        }
        return word[0]
    }
    )

    return result.map(word => word!.toLowerCase()) as string[]
}

const countLemmas = (arr: arrLemma) => {
    return arr.reduce((acc: Record<string, number>,item: string)=>{
        if (acc[item]){
            acc[item] +=1
        } else {
            acc[item] = 1
        }
        return acc
    },{})
} 


const mapWordsToLemmas = (arr: arrLemma): LemmaItem[] => {
    const morphyObj = morphy.lemmatize(arr)
    const morphyArr = Object.entries(morphyObj) as morphyArrItem[]
    return morphyArr.map((item)=>{
        const [ key, value] = item 
        if(value.length === 0) {
            return { word: key.toLowerCase(), lemma: key.toLowerCase() }
        }
        return { word: key.toLowerCase(), lemma: value[0]!.toLowerCase() }
    })

}

export {normalizeWords, countLemmas, mapWordsToLemmas}

