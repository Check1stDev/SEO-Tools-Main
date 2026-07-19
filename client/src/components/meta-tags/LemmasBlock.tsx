import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

type LemmasBlockProps = {
    data: Record<string, {
        count: number;
        description: number;
        title: number;
        h1: number;
        }>
    onHover: (lemma: string) => void;
        }


const LemmasBlock = ({data, onHover}: LemmasBlockProps) => {
    const lemmasArr = Object.entries(data).sort((a, b) => b[1].count - a[1].count);
    return(
        <Card className="flex h-full min-h-[420px] w-full flex-col overflow-hidden py-0">
            <CardHeader className="gap-1 border-b px-5 py-4">
                <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                        <CardTitle className="text-base">
                            Леммы
                        </CardTitle>

                        <CardDescription>
                            Найденные слова и количество повторений
                        </CardDescription>
                    </div>

                    <Badge
                        variant="secondary"
                        className="shrink-0 bg-brand-green/25 text-brand-green-foreground"
                    >
                        {lemmasArr.length}
                    </Badge>
                </div>
            </CardHeader>
                <CardContent className="flex min-h-0 flex-1 flex-col px-5 py-4">
                    <div className="grid shrink-0 grid-cols-[minmax(0,1fr)_48px_32px_32px_32px] gap-x-3 border-b px-2 pb-2 text-xs font-medium text-muted-foreground">
                        <div>Лемма</div>
                        <div className="text-center">Всего</div>
                        <div className="text-center">T</div>
                        <div className="text-center">D</div>
                        <div className="text-center">H1</div>
                    </div>

                    <ScrollArea className="h-0 min-h-0 flex-1">
                        <div className="space-y-0.5 py-2 pr-3">
                        {lemmasArr.map(([lemma, counts]) => (
                            <div
                                key={lemma}
                                className="grid grid-cols-[minmax(0,1fr)_48px_32px_32px_32px] gap-x-3 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-accent/60"
                                onMouseEnter={() => onHover(lemma)}
                                onMouseLeave={() => onHover("")}
                            >
                                <div className="truncate font-medium">
                                    {lemma}
                                </div>

                                <div className="text-right tabular-nums">
                                    {counts.count}
                                </div>

                                <div className="text-right tabular-nums text-muted-foreground">
                                    {counts.title}
                                </div>

                                <div className="text-right tabular-nums text-muted-foreground">
                                    {counts.description}
                                </div>

                                <div className="text-right tabular-nums text-muted-foreground">
                                    {counts.h1}
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}
export default LemmasBlock