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
    onSubmitKeywords: (keywords: string[]) => void
}
const KeywordsPanel = ({onSubmitKeywords}: KeywordsPanelProps) => {

const [keysListState, setKeysListState]= useState('')

const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setKeysListState(value)
}

const sendKeywords = (str: string) => {
    const arr = str
            .trim()
            .split(/[ \n]+/);
    return arr.filter(word=> word !== '')
    }

  return (
        <Card className="flex h-full min-h-105 w-full flex-col overflow-hidden py-0">
            <CardHeader className="gap-1 border-b px-5 py-4">
                <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                        <CardTitle className="text-base">
                            Ключевые слова
                        </CardTitle>

                        <CardDescription>
                            Введите ключевые фразы с новой строки
                        </CardDescription>
                    </div>

                    <Badge
                        variant="secondary"
                        className="shrink-0 bg-brand-green/25 text-brand-green-foreground"
                    >
                        {sendKeywords(keysListState).length}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="flex min-h-0 flex-1 px-5 py-4">
                <Textarea
                    className="field-sizing-fixed min-h-[280px] flex-1 resize-none overflow-y-auto bg-background"
                    placeholder={"купить квартиру\nцены на квартиры\nновостройки Москвы"}
                    value={keysListState}
                    onChange={handleChange}
                />
            </CardContent>

           <CardFooter className="justify-end gap-2 border-t bg-muted/30 px-5 py-3">
                <Button
                    type="button"
                    variant="ghost"
                    disabled={!keysListState}
                    onClick={() => setKeysListState("")}
                >
                    Сбросить
                </Button>

                <Button
                    type="button"
                    disabled={!keysListState.trim()}
                    onClick={() => onSubmitKeywords(sendKeywords(keysListState))}
                >
                    Анализировать
                </Button>
            </CardFooter>
        </Card>
    );
};

export default KeywordsPanel;