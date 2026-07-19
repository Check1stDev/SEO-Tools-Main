import KeywordsPanel from '@/components/meta-tags/KeywordsPanel'
import { useContext, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { submitKeywords, submitKeywordsMap } from '@/api/lemmas'
import { KeywordsRawBlock } from '@/components/meta-tags/KeywordsRawBlock'
import LemmasBlock from '@/components/meta-tags/LemmasBlock'
import SnippetPreviewBlock from '@/components/meta-tags/SnippetPreviewBlock'
import MetaTagsForm from '@/components/meta-tags/MetaTagsForm' 
import {keyScissors, lightLemmasExample, countLemmaMetaTags} from '@/utils/SeoMetaCalculations'

export type LemmaItem = {
    word: string;
    lemma: string;
};
type ProcessedResult = Record<string, LemmaItem[]>;

interface LemmaMetaMap {
    description: LemmaItem[]
    title: LemmaItem[]
    h1: LemmaItem[]
}

export default function MetaTags(){
    const [lemmasList, setLemmasList] = useState<Record<string, number>>({});
    const [wordsMetaMap, setWordsMetaMap] = useState<LemmaMetaMap>({
        description: [],
        title: [],
        h1: []
    }) 
    const [activeLemma, setActiveLemma] = useState<string>('')

    const [metaData, setMetaData] = useState({
        title: '',
        description: '',
        h1: '',
        url: ''
    });

    const submitKeys =  useMutation({
        mutationFn: async (arr: string[]) => {
            const result = await submitKeywords(arr) 
            return result
        },
        onSuccess: (data) => {
            setLemmasList(data.data)
            console.log(data.data)
        }
        })

    const handleSubmitKeywords = (arr: string[]) => {
        submitKeys.mutate(arr)
    }

    const submitMetaWords = useMutation({
        mutationFn: async (arr: Record<string, string[]>) => {
            const result = await submitKeywordsMap(arr) 
            return result
        },
        onSuccess: (data) => {
            setWordsMetaMap(data.data)
            console.log(data.data)
        }
    })

    const clearString = (str: string) => {
        const arr = str
            .replace(/\p{P}/gu, '')
            .trim()
            .split(' ')
        return arr
    }

    const handleSubmitWordsMap = () => {
        const arr: Record<string, string[]> = {
            title: clearString(metaData.title),
            description: clearString(metaData.description),
            h1: clearString(metaData.h1)
        }
        submitMetaWords.mutate(arr)
    }

    const handleTextChange = (field: string, value: string) => {
        setMetaData((prev) => ({
            ...prev,
            [field]: value
        }))
    }
    const lemmasMap = countLemmaMetaTags(lemmasList, wordsMetaMap)

    const lightKeys = lightLemmasExample(activeLemma, wordsMetaMap)

    return(
        <>
        <div className='grid grid-cols-1 lg:grid-cols-5 lg:grid-rows-6 gap-4 lg:h-auto mb-5'>
            <div className='h-100 lg:h-auto lg:col-span-1 lg:row-span-6'>
                <KeywordsPanel onSubmitKeywords={handleSubmitKeywords} />
            </div>
            <div className='h-100 lg:h-auto lg:col-span-1 lg:row-span-6'>
                <LemmasBlock data={lemmasMap} onHover={setActiveLemma}/>
            </div>
            <div className='h-100 lg:h-auto lg:col-span-3 lg:row-span-6'>
                <SnippetPreviewBlock 
                    title={metaData.title}
                    description={metaData.description}
                    h1={metaData.h1}
                    url={metaData.url}
                    activeWords={lightKeys}/>
                <MetaTagsForm 
                    onSubmit={handleSubmitWordsMap}
                    onChange={handleTextChange}
                    metaData={metaData}
                    />
            </div>
         </div>
         <div className='mb-5'>
            <KeywordsRawBlock />
         </div>
        </>
    )
}
