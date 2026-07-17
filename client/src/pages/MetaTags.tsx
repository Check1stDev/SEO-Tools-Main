import KeywordsPanel from '@/components/meta-tags/KeywordsPanel'
import { useContext, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { submitKeywords, submitKeywordsMap } from '@/api/lemmas'
import { KeywordsRawBlock } from '@/components/meta-tags/KeywordsRawBlock'
import LemmasBlock from '@/components/meta-tags/LemmasBlock'
import SnippetPreviewBlock from '@/components/meta-tags/SnippetPreviewBlock'
import MetaTagsForm from '@/components/meta-tags/MetaTagsForm' 

export type LemmaItem = {
    word: string;
    lemma: string;
};
type ProcessedResult = Record<string, LemmaItem[]>;

export default function MetaTags(){
    const [lemmasList, setLemmasList] = useState<Record<string, number>>({});
    const [wordsMetaMap, setWordsMetaMap] = useState<ProcessedResult>({}) 

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

    const handleSubmitWordsMap = (arr: Record<string, string[]>) => {
        submitMetaWords.mutate(arr)
    }


    return(
        <>
        <div className='grid grid-cols-1 lg:grid-cols-5 lg:grid-rows-6 gap-4 lg:h-[50vh] mb-5'>
            <div className='h-100 lg:h-auto lg:col-span-1 lg:row-span-6'>
                <KeywordsPanel onSubmitKeywords={handleSubmitKeywords} />
            </div>
            <div className='h-100 lg:h-auto lg:col-span-1 lg:row-span-6'>
                <LemmasBlock data={lemmasList}/>
            </div>
            <div className='h-100 lg:h-auto lg:col-span-3 lg:row-span-6'>
                <SnippetPreviewBlock />
                <MetaTagsForm onSubmitWordsMap={handleSubmitWordsMap}/>
            </div>
         </div>
         <div className='mb-5'>
            <KeywordsRawBlock />
         </div>
        </>
    )
}
