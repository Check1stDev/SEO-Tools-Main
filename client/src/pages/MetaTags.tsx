import KeywordsPanel from '@/components/meta-tags/KeywordsPanel'
import { useContext, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { submitKeywords, submitKeywordsMap } from '@/api/lemmas'
import { KeywordsRawBlock } from '@/components/meta-tags/KeywordsRawBlock'
import LemmasBlock from '@/components/meta-tags/LemmasBlock'
import SnippetPreviewBlock from '@/components/meta-tags/SnippetPreviewBlock'
import MetaTagsForm from '@/components/meta-tags/MetaTagsForm' 
import { lightLemmasExample, countLemmaMetaTags } from '@/utils/SeoMetaCalculations'
import {
    BotMessageSquare
} from 'lucide-react'

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

const initialMetaData = {
    title: '',
    description: '',
    h1: '',
    url: '',
}

export default function MetaTags(){
    const [lemmasList, setLemmasList] = useState<Record<string, number>>({});
    const [wordsMetaMap, setWordsMetaMap] = useState<LemmaMetaMap>({
        description: [],
        title: [],
        h1: []
    }) 
    const [activeLemma, setActiveLemma] = useState<string>('')

    const [metaData, setMetaData] = useState(initialMetaData);

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

    const handleClearMetaData = () => {
    setMetaData(initialMetaData)

    setWordsMetaMap({
        description: [],
        title: [],
        h1: [],
    })

    setActiveLemma("")
}

    return(
        <div className="w-full min-h-screen p-4 md:p-6 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Оптимизация мета-тегов
                </h1>
                <p className="text-muted-foreground">
                    Анализ вхождений лемм, генерация сниппета и проверка длины тегов.
                </p>
            </div>
            <div className="
                grid grid-cols-1 gap-5 items-stretch
                md:grid-cols-2
                xl:grid-cols-[minmax(260px,300px)_minmax(260px,300px)_minmax(420px,1fr)]
                2xl:grid-cols-[320px_320px_minmax(0,1fr)]
                ">
            
                <div className="flex min-h-0 min-w-0 flex-col">
                    <KeywordsPanel onSubmitKeywords={handleSubmitKeywords} />
                </div>
                
        
                <div className="flex min-h-0 min-w-0 flex-col">
                    <LemmasBlock
                        data={lemmasMap}
                        onHover={setActiveLemma}
                    />
                </div>
                
                <div className="
                    flex min-w-0 flex-col gap-5
                    md:col-span-2
                    xl:col-span-1
                ">
                    <SnippetPreviewBlock 
                        title={metaData.title}
                        description={metaData.description}
                        h1={metaData.h1}
                        url={metaData.url}
                        activeWords={lightKeys}
                    />
                    <MetaTagsForm 
                        onSubmit={handleSubmitWordsMap}
                        onChange={handleTextChange}
                        onClear={handleClearMetaData}
                        metaData={metaData}
                    />
                </div>
            </div>
            <div className='grid col-span-1 lg:grid-cols-4 gap-6 mb-5'>
                <div className='grid-span-1'>
                    <KeywordsRawBlock/>
                </div>
                {/* Заглушка под нейросеть */}
                <div className="col-span-3 rounded-xl border border-dashed border-zinc-300 bg-zinc-50/50 p-6 flex flex-col items-center justify-center text-center gap-2">
                    <div className="p-2 rounded-full bg-indigo-50 text-indigo-600">
                        <BotMessageSquare />
                    </div>
                    <h3 className="font-semibold text-zinc-900">AI-оптимизация скоро</h3>
                    <p className="text-sm text-zinc-500 max-w-sm">
                        Мы готовим модуль генерации мета-тегов с помощью нейросетей. Скоро здесь появится функционал для автоматической генерации Title и Description.
                    </p>
                </div>
            </div>
        </div>
    )
}
