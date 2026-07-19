import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Globe2 } from "lucide-react"

type SnippetPreviewBlockProps = {
    title?: string;
    url?: string;
    description?: string;
    h1?:string
    activeWords?: string[];
}

const SnippetPreviewBlock = ({
    title,
    url,
    description,
    h1,
    activeWords = []
}: SnippetPreviewBlockProps) => {

    const finalTitle = title || "Купить квартиру в Москве от 7,5 млн руб., продажа квартир во...";
    const finalUrl = url || "cian.ru › kupit-kvartiru/";
    const finalDescription = description || "Продажа квартир в Москве от 7,5 млн руб. Найдено 89 832 объявления. Абсолютно новая квартира! Панорамные виды на Москва-Сити и Триумфальную арку. Архитектурный проект Diamond Ray. Есть места в Москве, которые становятся частью образа жизни.";
    const finalH1 = h1 || "Купить квартиру в Москве";

    
    const truncateSmart = (str: string, maxLeng: number): string => {
        if (str.length <= maxLeng) return str

        const slised = str.slice(0,maxLeng)

        const lastSpaceIdex =  slised.lastIndexOf(' ')

        if (lastSpaceIdex > 0) {
            return slised.slice(0, lastSpaceIdex) + '...'
        }

        return slised + '...'
    }

    const highlightText = (text: string, keysArr: string[] = []) => {
        if (!keysArr || keysArr.length === 0) return <>{text}</>;
        const pattern = `(${keysArr.join('|')})`;
        const regex = new RegExp(pattern, 'gi');
        const parts = text.split(regex);

        return (
            <>
                {parts.map((part, index) => {
                    const isMatch = keysArr.some(
                        (key) => key.toLowerCase() === part.toLowerCase()
                    );
                    
                    if (isMatch) {
                        return (
                            <span 
                                key={index} 
                                className="rounded-sm bg-brand-yellow/45 px-0.5 font-semibold text-brand-yellow-foreground"
                            >
                                {part}
                            </span>
                        );
                    }
                    return <span key={index}>{part}</span>;
                })}
            </>
        );
    };

    return (
        <Card className="w-full overflow-hidden py-0">

            <CardHeader className="border-b px-5 py-4">
                <div className="flex items-center justify-between gap-3">
                    <CardTitle className="text-base">
                        Предпросмотр
                    </CardTitle>

                    <Badge
                        variant="outline"
                        className="border-brand-blue/20 bg-brand-blue/5 text-brand-blue"
                    >
                        Яндекс · Desktop
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-5 px-5 py-5">
                
                <div className="rounded-lg border bg-background p-4">
                    <div className="max-w-[620px] font-sans">
                        <div className="mb-1 flex items-start gap-2">
                            <Globe2 className="mt-1 size-4 shrink-0 text-muted-foreground" />

                            <div className="min-w-0">
                                <div className="line-clamp-2 cursor-default text-[18px] font-medium leading-[1.25] text-[#001bc2]">
                                    {highlightText(
                                        truncateSmart(finalTitle, 70),
                                        activeWords
                                    )}
                                </div>

                                <div className="mt-1 truncate text-[13px] text-[#006000]">
                                    {highlightText(
                                        truncateSmart(finalUrl, 70),
                                        activeWords
                                    )}
                                </div>

                                <div className="mt-1 line-clamp-3 text-[13px] leading-[1.45] text-[#333333]">
                                    {highlightText(
                                        truncateSmart(finalDescription, 160),
                                        activeWords
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Separator />
                <div className="space-y-3">
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            Пример заголовка страницы
                        </p>

                        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                            {highlightText(finalH1, activeWords)}
                        </h2>
                    </div>

                    <p className="line-clamp-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                        Съешь же ещё этих мягких французских булок, да выпей чаю.
                        Этот текст помогает оценить, как заголовок выглядит рядом с основным содержимым страницы.
                    </p>
                </div>
                </CardContent>
        </Card>
    )
}

export default SnippetPreviewBlock;