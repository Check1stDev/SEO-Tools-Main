
type LemmaItem = {
    word: string
    lemma: string
}
interface LemmaMetaMap {
    description: LemmaItem[]
    title: LemmaItem[]
    h1: LemmaItem[]
}

type WordMap = {
    count: number
    description: number
    title: number
    h1: number
}

type Meta = 'description' | 'title' | 'h1'

type LemmasMap = Record<string, WordMap>

const getLemmasMeta = (metaMap: LemmaMetaMap ,meta: Meta) => {

    const arrMeta = metaMap[meta]
    const lemmasArr = arrMeta.map(({lemma}: LemmaItem) => lemma)

    return lemmasArr
}



const countLemmaMetaTags = (lemmaKey: Record <string,number>, lemmaMetaMap: LemmaMetaMap) => {
    const result: LemmasMap = {}
    const arrLemmaKey = Object.entries(lemmaKey)
    const allDescriptions = getLemmasMeta(lemmaMetaMap, 'description');
    const allTitles = getLemmasMeta(lemmaMetaMap, 'title');
    const allH1s = getLemmasMeta(lemmaMetaMap, 'h1');
    arrLemmaKey.forEach(([word, count]: [string, number])=>{
        
        const descrCount = allDescriptions.filter(item => item === word).length
        const titleCount = allTitles.filter(item => item === word).length
        const h1Count = allH1s.filter(item => item === word).length

        result[word] = {
            count: count,
            description: descrCount,
            title: titleCount,
            h1: h1Count
        }
    })
    return result
}


    const lightLemmasExample = (actveLemma: string, lemmaMetaMap: LemmaMetaMap) => {
        const arrDescrMap = lemmaMetaMap.description
        const arrTitleMap = lemmaMetaMap.title
        const arrH1Map = lemmaMetaMap.h1

        const filterMap = (arr: LemmaItem[]) => {
            return arr.filter((item) => item.lemma === actveLemma)
                .map(item => item.word)
        } 

        return [
           ...filterMap(arrDescrMap),
           ...filterMap(arrTitleMap),
           ...filterMap(arrH1Map)
           ]
    }

    const keyScissors = (keysArr: string [], text: string) => {
        if (keysArr.length === 0) return [text];

        const pattern = `(${keysArr.join('|')})`
        const regex = new RegExp(pattern, 'gi');
        return text.split(regex)

    }

export {keyScissors, lightLemmasExample, countLemmaMetaTags}