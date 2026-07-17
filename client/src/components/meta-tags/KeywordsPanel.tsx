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
        <div className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white text-zinc-950 shadow-sm">
            
            <div className="flex flex-col space-y-1.5 p-6 pb-4">
                <h3 className="font-semibold leading-none tracking-tight">Ключевые слова</h3>
                <p className="text-sm text-zinc-500">
                    Введите ключевые фразы с новой строки
                </p>
            </div>

            <div className="flex flex-1 flex-col p-6 pt-0 min-h-0">
                <textarea
                    className="flex-1 w-full resize-none rounded-md border border-zinc-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 custom-scrollbar"
                    placeholder="купить квартиру..."
                    value={keysListState}
                    onChange={handleChange}
                />
            </div>
            <div className="flex items-center justify-end space-x-2 p-6 pt-0">
                <button
                    type="button"
                    className="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950"
                    onClick={() => setKeysListState('')}
                >
                    Сбросить
                </button>
                
                <button
                    type="button"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-50 shadow transition-colors hover:bg-zinc-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950"
                    onClick={() => onSubmitKeywords(sendKeywords(keysListState))}
                >
                    Отправить
                </button>
            </div>
        </div>
    );
};

export default KeywordsPanel;