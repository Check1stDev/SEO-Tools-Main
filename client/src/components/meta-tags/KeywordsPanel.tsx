import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import { useState } from "react";

type KeywordsPanelProps = {
    buttonSubmit?: string
    panelName?: string
    buttonState?: boolean
    onSubmitKeywords?: (keywords: string[]) => void
    splitMode?: 'words' | 'lines'
    value?: string
    onChange?: (keywords: string) => void
}
const KeywordsPanel = ({buttonSubmit, panelName, buttonState = true, onSubmitKeywords, splitMode = 'words',value,onChange}: KeywordsPanelProps) => {

const [keysListState, setKeysListState]= useState('')

const isControlled = value !== undefined

const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value: string = e.target.value 
    if (isControlled && onChange) {
       return onChange(value)
    }
    setKeysListState(value)
}

const handleClear = () => {
    if (isControlled && onChange) {
        onChange('')
        return
    }
    setKeysListState('')
}

const sendKeywords = (str: string) => {
    if (splitMode === 'lines') {
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

const currentValue = isControlled ? value : keysListState

  return (
        <Card className="flex h-full min-h-105 w-full flex-col overflow-hidden py-0">
            <CardHeader className="gap-1 border-b px-5 py-4">
                <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                        <CardTitle className="text-base">
                            {panelName ? panelName : 'Ключевые слова'}
                        </CardTitle>

                        <CardDescription>
                            Введите ключевые фразы с новой строки
                        </CardDescription>
                    </div>

                    <Badge
                        variant="secondary"
                        className="shrink-0 bg-brand-green/25 text-brand-green-foreground"
                    >
                        {sendKeywords(currentValue).length}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="flex min-h-0 flex-1 px-5 py-4">
                <Textarea
                    className="field-sizing-fixed min-h-[280px] flex-1 resize-none overflow-y-auto bg-background"
                    placeholder={"купить квартиру\nцены на квартиры\nновостройки Москвы"}
                    value={currentValue}
                    onChange={handleChange}
                />
            </CardContent>

           <CardFooter className="justify-end gap-2 border-t bg-muted/30 px-5 py-3">
                <Button
                    type="button"
                    variant="ghost"
                    disabled={!currentValue}
                    onClick={handleClear}
                >
                    Сбросить
                </Button>
                {buttonState &&
                    (<Button
                    type="button"
                    disabled={!currentValue.trim()}
                    onClick={() => onSubmitKeywords?.(sendKeywords(currentValue))}
                >
                    {buttonSubmit ? buttonSubmit : 'Анализировать'}
                </Button>)}
            </CardFooter>
        </Card>
    );
};

export default KeywordsPanel;