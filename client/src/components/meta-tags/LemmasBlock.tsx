import { useState } from "react";

type LemmasBlockProps = {data: Record<string, number>}


const LemmasBlock = ({data}: LemmasBlockProps) => {
    const lemmasArr: [string, number][] = Object.entries(data).sort((a, b) => b[1] - a[1])
    return(
        <div className="flex h-full w-full flex-col rounded-xl border border-zinc-200 bg-white text-zinc-950 shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
            <div className="flex items-center justify-between">
            <h3 className="font-semibold leading-none tracking-tight">Леммы</h3>
            <span className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-semibold text-zinc-900">
                {lemmasArr.length}
            </span>
            </div>
            <p className="text-sm text-zinc-500">
            Найденные слова и количество повторений
            </p>
        </div>
        <div className="p-6 pt-0 flex-1 overflow-y-auto min-h-0">
            <div className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-3 text-sm">
            <div className="contents text-zinc-500">
                <div className="border-b border-zinc-200 pb-2 font-medium">Лемма</div>
                <div className="border-b border-zinc-200 pb-2 text-right font-medium">Количество</div>
            </div>
            {lemmasArr.map(([lemma, count]: [string, number])=> {
            return <div className="contents">
                <div className="py-1">{lemma}</div>
                <div className="py-1 text-right tabular-nums">{count}</div>
            </div>                

            })}
            </div>
        </div>
        </div>
    )
}

export default LemmasBlock