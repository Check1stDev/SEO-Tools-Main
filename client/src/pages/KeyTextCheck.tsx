import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { submitCheckText }  from '@/api/textCheck'
import KeywordsPanel from '@/components/meta-tags/KeywordsPanel'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Copy, RotateCcw } from 'lucide-react';
import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig, // Импортируем именно как тип
} from "@/components/ui/chart"

type AllKeywords = {
            main:  string[],
            lsi: string[],
            highlight: string[]
        }

type AnalyzePayload = {
    text: string
    keywords: AllKeywords
}

type MatchWord = {
    word: string
    lemma: string
    index: number
}

type KeywordResult = {
    keyword: string
    matches: MatchWord[][]
}

type AnalyzeData = {
    main: KeywordResult[]
    lsi: KeywordResult[]
    highlight: KeywordResult[]
}

type KeywordCount = {
    keyword: string
    count: number
}
type KeywordType = 'main' | 'lsi' | 'highlight'

type LightKeywords = {
    word: string 
    start: number
    end: number
    type: KeywordType
}

// Данные для радара (показатели и их значения/веса)
const chartData = [
  { metric: "Основные", value: 85 },
  { metric: "Дополнительные", value: 65 },
  { metric: "Подсветка", value: 90 },
  { metric: "Стоп-слова", value: 30 },
]

const chartConfig = {
  value: {
    label: "Показатель",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export default function KeyTextCheck() {
    const [text, setText] = useState('')
    const [markedText, setMarkedText] = useState([] as React.ReactNode[]) 
    const [mainKeywords, setMainKeywords] = useState('')
    const [lsiKeywords, setLsiKeywords] = useState('')
    const [highlightKeywords, setHighlightKeywords] = useState('')
    const [analyzeData, setAnalyzeData] = useState({} as AnalyzeData)
    const [waterStatistic, setWaterStatistic] = useState(0)
    const [spamStatistic, setSpamStatistic] = useState(0)
    const [nauseaStatistic, setNauseaStatistic] = useState(0)
    


    const [hasErrorText, setHasErrorText] = useState(false);
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!text.trim()){
            setHasErrorText(true)
            return
        }
    setHasErrorText(false);
        const allKeywords = {
            main:  arrKeywords(mainKeywords, 'lines'),
            lsi: arrKeywords(lsiKeywords, 'words'),
            highlight: arrKeywords(highlightKeywords, 'words')
        }

    handleSubmitAnalyze({
        text: text,
        keywords: allKeywords
    })

    console.log(matchesCount(analyzeData.main))
    console.log(matchesCount(analyzeData.lsi))
    console.log(matchesCount(analyzeData.highlight))
    }

    const arrKeywords = (str: string, mode: 'lines' | 'words') => {
    if (mode === 'lines') {
            const arr = str
                    .split('\n');
            const trimArr = arr.map(item => item.trim())
            return trimArr.filter(word => word !== '')
    }
            const arr = str
                    .trim()
                    .split(/[ \n]+/);
            return arr.filter(word => word !== '')
    }

    const submitAnalize =  useMutation({
        mutationFn: async ({text, keywords}: AnalyzePayload) => {
            const result = await submitCheckText(text, keywords) 
            return result
        },
        onSuccess: (data) => {
            setAnalyzeData(data.data)
            const lightData = lightKeywords(data.data)
            const marked = textHightlighter(text, lightData)
            
            setMarkedText(marked)

            setWaterStatistic(data.data.water)
            setSpamStatistic(data.data.spamPercent)
            setNauseaStatistic(data.data.academicNausea)
        }
    })


    const handleSubmitAnalyze  = ({text, keywords}: AnalyzePayload) => {
            submitAnalize.mutate ({text, keywords})
        }

    const matchesCount = (arrDataKeywords: KeywordResult []) => {
        return arrDataKeywords.map((item) => {
            return {
                keyword: item.keyword,
                count: item.matches.length
                }
        })
    }

    const usedKeywordsCount = (matchesCount: KeywordCount []) => {
        const used = matchesCount.filter(item => item.count > 0)
        const unused = matchesCount.filter(item => item.count === 0)

        return {
            keywords: matchesCount.length,
            used: used.length,
            unused: unused.length
        }
    }

    const uniqueResult = (lightKeywords: LightKeywords[]) => {
        return lightKeywords.filter((item, index) => {
            const firstIndex = lightKeywords.findIndex((searchItem) => {
                return item.start === searchItem.start && item.end === searchItem.end
            })
            return index === firstIndex
        })

    }

    const lightKeywords = (analyzeData: AnalyzeData) => {

        const main = analyzeData.main
        const lsi = analyzeData.lsi
        const highlight = analyzeData.highlight

        const flatMainMatches = main.flatMap(item => item.matches.flatMap(match => match))
        const flatLsiMatches = lsi.flatMap(item => item.matches.flatMap(match => match))
        const flatHighlightMatches = highlight.flatMap(item => item.matches.flatMap(match => match))

        const mainKeys = flatMainMatches.map((item) => {
            return {
                word: item.word,
                start: item.index,
                end: item.index + item.word.length,
                type: 'main' as const
            }
        })

        const lsiKeys = flatLsiMatches.map((item) => {
            return {
                word: item.word,
                start: item.index,
                end: item.index + item.word.length,
                type: 'lsi' as const
            }
        })

        const highlightKeys = flatHighlightMatches.map((item) => {
            return {
                word: item.word,
                start: item.index,
                end: item.index + item.word.length,
                type: 'highlight' as const
            }
        })

        const arrKeys : LightKeywords[] = [...mainKeys,...highlightKeys,...lsiKeys] 
        const result : LightKeywords[] = uniqueResult(arrKeys)
        return result.sort((a,b)=> a.start - b.start)
    }

    

    const mainCount = matchesCount(analyzeData?.main ?? [])
    const mainSummary = usedKeywordsCount(mainCount)


    const lsiCount = matchesCount(analyzeData?.lsi ?? [])
    const lsiSummary = usedKeywordsCount(lsiCount)


    const highlightCount = matchesCount(analyzeData?.highlight ?? [])
    const highlightSummary = usedKeywordsCount(highlightCount)

    const textHightlighter = (text: string ,lightKeywords : LightKeywords[] ) => {
        let lastIndex = 0
        const parts: React.ReactNode[] = []
        lightKeywords.forEach((item) => {
                const startIdex = item.start
                const endIdex = item.end
                const typeKetword: KeywordType = item.type
                const before = text.slice(lastIndex,startIdex)
                const keyword = text.slice(startIdex, endIdex)
                const keywordColors = {
                    main: 'bg-emerald-100 text-emerald-800',
                    lsi: 'bg-yellow-100 text-yellow-800',
                    highlight: 'bg-blue-100 text-blue-800'
                    }
                lastIndex = endIdex
                parts.push(before)
                parts.push(<span className={keywordColors[typeKetword]}> 
                    {keyword}
                    </span>)
                })
                if (lastIndex < text.length) {
                    parts.push(text.slice(lastIndex))
                }
            return parts
        }

    const noSpaces = text.replace(/\s+/g, '');
    const textWords = text.trim().split(/\s+/);

    return(
        <div className="w-full min-h-screen p-4 md:p-6 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        Анализ текста
                    </h1>
                    <p className="text-muted-foreground">
                        Проверка на соответствие ТЗ
                    </p>
                </div>
            <div className="grid grid-cols-6 gap-5 min-h-400">
                {/* 1-е поле ключей */}
                <div className="flex min-h-0 min-w-0 flex-col">
                    <KeywordsPanel panelName='Основные ключи' buttonState={false} splitMode='lines'  value={mainKeywords} onChange={setMainKeywords}/>
                </div>

                {/* 2-е поле ключей */}
                <div className="flex min-h-0 min-w-0 flex-col">
                    <KeywordsPanel panelName='Дополнительные ключи' buttonState={false} splitMode='words'  value={lsiKeywords} onChange={setLsiKeywords}/>
                </div>

                {/* 3-е поле ключей */}
                <div className="flex min-h-0 min-w-0 flex-col">
                    <KeywordsPanel panelName='Подсветка' buttonState={false} splitMode='words'  value={highlightKeywords} onChange={setHighlightKeywords}/>
                </div>

                <form onSubmit={handleSubmit} className="col-span-3 flex flex-col gap-4">
                    <ResizablePanelGroup
                        orientation="vertical"
                        className="w-full min-h-50 rounded-lg border"
                        >
                        <ResizablePanel defaultSize="25%">
                        <div className="flex flex-col h-full justify-between p-4 gap-4 text-sm bg-card">
                            {/* Заголовок блока */}
                            <div className="flex items-center justify-between border-b pb-2">
                                <span className="font-semibold text-gray-900">Статистика текста</span>
                                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">Live</span>
                            </div>

                            {/* Блок 1: Характеристики текста*/}
                            <div className="grid grid-cols-2 gap-3">
                                {/* Уникальность */}
                                <div className="flex flex-col p-2.5 rounded-lg border bg-muted/20">
                                    <span className="text-xs text-muted-foreground">Уникальность</span>
                                    <span className="text-lg font-bold text-emerald-600 mt-1">98%</span>
                                    <span className="text-[10px] text-emerald-600/80 mt-0.5">Отличный показатель</span>
                                </div>
                                {/* Длинна */}
                                <div className="flex flex-col p-2.5 rounded-lg border bg-muted/20">
                                    <span className="text-xs text-muted-foreground">Длинна текста</span>
                                    <span className="text-lg font-bold text-emerald-600 mt-1">{noSpaces.length}/{textWords.length}</span>
                                    <span className="text-[10px] text-emerald-600/80 mt-0.5">Количество: Символы без прбела/Кол-во слов </span>
                                </div>
                                {/* Детектор ИИ */}
                                <div className="flex flex-col p-2.5 rounded-lg border bg-muted/20">
                                    <span className="text-xs text-muted-foreground">Детектор ИИ </span>
                                    <div className="p-2 rounded-full bg-indigo-50 text-indigo-600"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-bot-message-square" aria-hidden="true"><path d="M12 6V2H8"></path><path d="M15 11v2"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M20 16a2 2 0 0 1-2 2H8.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 4 20.286V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z"></path><path d="M9 11v2"></path></svg></div>
                                    <span className="text-[10px] text-emerald-600/80 mt-0.5">В разароботке </span>
                                </div>
                                {/* Вода */}
                                <div className="flex flex-col p-2.5 rounded-lg border bg-muted/20">
                                    <span className="text-xs text-muted-foreground">Вода</span>
                                    <span className="text-lg font-bold text-amber-600 mt-1">{waterStatistic}%</span>
                                    <span className="text-[10px] text-amber-600/80 mt-0.5">В пределах нормы</span>
                                </div>
                                {/* Тошнота */}
                                <div className="flex flex-col p-2.5 rounded-lg border bg-muted/20">
                                    <span className="text-xs text-muted-foreground">Тошнота (академ.)</span>
                                    <span className="text-lg font-bold text-amber-600 mt-1">{nauseaStatistic}%</span>
                                    <span className="text-[10px] text-amber-600/80 mt-0.5">В пределах нормы</span>
                                </div>
                                {/* Переспам */}
                                <div className="flex flex-col p-2.5 rounded-lg border bg-muted/20">
                                    <span className="text-xs text-muted-foreground">Переспам</span>
                                    <span className="text-lg font-bold text-amber-600 mt-1">{spamStatistic}%</span>
                                    <span className="text-[10px] text-amber-600/80 mt-0.5">В пределах нормы</span>
                                </div>
                            </div>

                            {/* Блок 2: Счётчик вхождений и плотность ключей */}
                            <div className="flex flex-col gap-2 border-t pt-3">
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Ключевые слова</span>
                                
                                <div className="flex flex-col gap-1.5 text-xs">
                                    {/* Основные ключи */}
                                    <div className="flex items-center justify-between p-2 rounded bg-blue-50/50 border border-blue-100">
                                        <span className="text-blue-900 font-medium">Основные</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-muted-foreground">{mainSummary.used}/{mainSummary.keywords}</span>
                                            <span className="font-bold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded">1.8%</span>
                                        </div>
                                    </div>

                                    {/* LSI */}
                                    <div className="flex items-center justify-between p-2 rounded bg-emerald-50/50 border border-emerald-100">
                                        <span className="text-emerald-900 font-medium">Дополнительные</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-muted-foreground">{lsiSummary.used}/{lsiSummary.keywords}</span>
                                            <span className="font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">3.1%</span>
                                        </div>
                                    </div>

                                    {/* Подсветка */}
                                    <div className="flex items-center justify-between p-2 rounded bg-emerald-50/50 border border-emerald-100">
                                        <span className="text-emerald-900 font-medium">Дополнительные</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-muted-foreground">{highlightSummary.used}/{highlightSummary.keywords}</span>
                                            <span className="font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">3.1%</span>
                                        </div>
                                    </div>

                                    {/* Стоп-слова */}
                                    <div className="flex items-center justify-between p-2 rounded bg-red-50/50 border border-red-100">
                                        <span className="text-red-900 font-medium">Стоп-слова</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-muted-foreground">2 раз(а)</span>
                                            <span className="font-bold text-red-700 bg-red-100 px-1.5 py-0.5 rounded">0.9%</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col h-full justify-between p-4 gap-3 text-sm bg-card">

                                <div className="flex flex-col border rounded-lg p-3 bg-muted/10 items-center justify-center flex-1">
                                       <div className='grid grid-cols-1 md:grid-cols-3 gap-3 p-4 w-full h-full min-h-[300px]'>
                                            <div className='flex flex-col gap-2 rounded-lg border p-3'>
                                                <h3 className="font-semibold text-sm">Ключи</h3>
                                                {mainCount.map((item) => (
                                                    <div key={item.keyword} className='flex items-center justify-between gap-2 text-xs'>
                                                        <span className="truncate">{item.keyword}</span>
                                                        <span className="font-semibold">{item.count}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className='flex flex-col gap-2 rounded-lg border p-3'>
                                                <h3 className="font-semibold text-sm">LSI</h3>
                                                {lsiCount.map((item) => (
                                                    <div key={item.keyword} className='flex items-center justify-between gap-2 text-xs'>
                                                        <span className="truncate">{item.keyword}</span>
                                                        <span className="font-semibold">{item.count}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className='flex flex-col gap-2 rounded-lg border p-3'>
                                                <h3 className="font-semibold text-sm">Подсветка</h3>
                                                {highlightCount.map((item) => (
                                                    <div key={item.keyword} className='flex items-center justify-between gap-2 text-xs'>
                                                        <span className="truncate">{item.keyword}</span>
                                                        <span className="font-semibold">{item.count}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        </ResizablePanel>
                        <ResizableHandle />
                        <ResizablePanel defaultSize="75%">
                            <div className="flex h-full items-center justify-center p-6">
                        <Field data-invalid={hasErrorText}>
                            <FieldLabel htmlFor="textarea-invalid">Текст</FieldLabel>
                            <Textarea
                                value={text}
                                id="textarea-invalid"
                                onChange={(event)=> {setText(event.target.value)
                                    if(hasErrorText) {
                                        setHasErrorText(false);
                                    }}
                                }
                                placeholder="Вставьте свой текст"
                                aria-invalid={hasErrorText}
                                className='min-h-[200px]'
                            />
                            <FieldDescription>
                                {hasErrorText ? (
                                    <span className="text-red-500 font-medium">Пожалуйста, введите текст для анализа</span>
                                ) : (
                                    "Пожалуйста вставьте свой текст для анализа"
                                )}
                            </FieldDescription>
                            </Field>
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                    <div className="flex flex-col-reverse gap-2 border-t bg-muted/30 px-5 py-3 sm:flex-row sm:justify-end">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => {
                                setText('');
                                setHasErrorText(false);
                            }}
                        >
                            Сбросить
                        </Button>

                        <Button
                            onSubmit={handleSubmit}
                            type="submit"
                        >
                            Анализировать
                        </Button>
                    </div>
                </form>
                {/* Поле результата анализа */}
                <div className="col-span-6 flex flex-col rounded-lg border bg-card overflow-hidden shadow-sm">
                            {/* Заголовок блока */}
                            <div className="px-5 py-3 border-b bg-muted/30 font-semibold text-sm">
                                Результат с подсветкой
                            </div>

                            {/* Тело заглушки с примером «псевдоподсвеченного» текста */}
                            <div className="p-5 min-h-[150px] text-sm leading-relaxed text-gray-700 bg-white">
                                
                                {markedText.length > 0
                                    ? markedText
                                    : <p>
                                        Здесь будет отображаться ваш проанализированный текст. Ключевые слова вроде{' '}
                                        <span className="bg-blue-100 text-blue-800 px-1 py-0.5 rounded font-medium">основного ключа</span>,{' '}
                                        <span className="bg-emerald-100 text-emerald-800 px-1 py-0.5 rounded font-medium">дополнительного</span>{' '}
                                        или <span className="bg-red-100 text-red-800 px-1 py-0.5 rounded font-medium">стоп-слова</span>{' '}
                                        будут аккуратно подсвечиваться разными цветами прямо в теле документа.
                                    </p>
                                }
                            </div>

                            {/* Панель управления (кнопки сброса и копирования) */}
                            <div className="flex flex-col-reverse gap-2 border-t bg-muted/30 px-5 py-3 sm:flex-row sm:justify-end">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => console.log('Сбросить заглушку')}
                                >
                                    <RotateCcw className="size-4 mr-2" />
                                    Сбросить
                                </Button>

                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => console.log('Скопировать заглушку')}
                                >
                                    <Copy className="size-4 mr-2" />
                                    Скопировать
                                </Button>
                            </div>
                        </div>
            </div>
        </div>
    )
    
}