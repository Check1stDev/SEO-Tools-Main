import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useState } from "react"
import { Check, Copy } from "lucide-react"

type MetaTagsFormProps = {
    metaData: {
        title: string
        description: string
        h1: string
        url: string
    }
    onChange: (field: string, value: string) => void
    onSubmit: () => void
    onClear: () => void
}

type LengthStatus = "success" | "warning" | "destructive"
type MetaField = "title" | "description" | "h1"

const getLengthStatus = (
    length: number,
    visibleLimit: number,
    acceptableLimit: number
): LengthStatus => {
    if (length <= visibleLimit) return "success"
    if (length <= acceptableLimit) return "warning"

    return "destructive"
}

const progressColors: Record<LengthStatus, string> = {
    success: "bg-success",
    warning: "bg-warning",
    destructive: "bg-destructive",
}

const counterColors: Record<LengthStatus, string> = {
    success: "text-success",
    warning: "text-warning",
    destructive: "text-destructive",
}

const MetaTagsForm = ({metaData, onChange, onSubmit, onClear}: MetaTagsFormProps) => {

    const [isCopied, setIsCopied] = useState(false)
    
        const metaLength = (meta: MetaField): number =>{
            return metaData[meta].length
        } 

        const titleStatus = getLengthStatus(metaLength('title'), 60, 70)
        const descriptionStatus = getLengthStatus(metaLength('description'), 160, 170)
        const h1Status = getLengthStatus(metaLength('h1'), 60, 70)

        const metaProgress = (metaLength: number,lengthMax: number) =>{ 
        return Math.min(
            (metaLength / lengthMax) * 100,
            100
        )}
        
        const titleProgress = metaProgress(metaLength('title'), 70)
        const descriptionProgress = metaProgress(metaLength('description'), 170)
        const h1Progress = metaProgress(metaLength('h1'), 70)

        const handleCopy = async () => {
            const text = [
                `URL: ${metaData.url}`,
                `Title: ${metaData.title}`,
                `Description: ${metaData.description}`,
                `H1: ${metaData.h1}`,
            ].join("\n")

            await navigator.clipboard.writeText(text)

            setIsCopied(true)

            setTimeout(() => {
                setIsCopied(false)
            }, 2000)
        }
    

    return (
        <Card className="w-full overflow-hidden py-0">
            <CardHeader className="gap-1 border-b px-5 py-4">
                <CardTitle className="text-base">
                    Редактор метатегов
                </CardTitle>

                <CardDescription>
                    Заполните данные страницы и проверьте результат в предпросмотре
                </CardDescription>
            </CardHeader>
            {/* Контентная часть с полями ввода */}
            <CardContent className="grid gap-5 px-5 py-5">
                
                {/* Поле URL */}
                <div className="grid gap-2">
                    <Label htmlFor="url">URL</Label>

                    <Input
                        id="url"
                        value={metaData.url}
                        onChange={(e) => onChange("url", e.target.value)}
                        placeholder="https://site.ru/page/"
                    />
                </div>

                {/* Поле H1 */}
                <div className="grid gap-2">
                    <div className="flex items-center justify-between gap-3">
                        <Label htmlFor="h1">Заголовок (H1)</Label>
                        <span className={`text-xs font-medium tabular-nums ${counterColors[h1Status]}`}>
                            {metaData.h1.length} / 60
                        </span>
                    </div>
                    <Input
                        id="h1"
                        value={metaData.h1}
                        onChange={(e)=>onChange ('h1', e.target.value)}
                        placeholder="Главный заголовок на странице"
                    />

                    <Progress
                        value={h1Progress}
                        className="h-1.5"
                        indicatorClassName={progressColors[h1Status]}
                    />
                </div>

                {/* Поле Title */}
                <div className="grid gap-2">
                    <div className="flex items-center justify-between gap-3">
                        <Label htmlFor="title">Title</Label>

                        <span className={`text-xs font-medium tabular-nums ${counterColors[titleStatus]}`}>
                            {metaData.title.length} / 60
                        </span>
                    </div>

                    <Input
                        id="title"
                        value={metaData.title}
                        onChange={(e)=> onChange ('title', e.target.value)}
                        placeholder="Оптимизированный Title для выдачи"
                    />

                    <Progress
                        value={titleProgress}
                        className="h-1.5"
                        indicatorClassName={progressColors[titleStatus]}
                    />
                </div>

                {/* Поле Description */}
                <div className="grid gap-2">
                    <div className="flex items-center justify-between gap-3">
                        <Label htmlFor="description">
                            Description
                        </Label>

                        <span className={`text-xs font-medium tabular-nums ${counterColors[descriptionStatus]}`}>
                            {metaData.description.length} / 160
                        </span>
                    </div>

                    <Textarea
                        id="description"
                        value={metaData.description}
                        onChange={(e) => onChange("description", e.target.value)}
                        placeholder="Краткое описание страницы..."
                        className="field-sizing-fixed min-h-24 resize-none"
                    />
                    <Progress
                        value={descriptionProgress}
                        className="h-1.5"
                        indicatorClassName={progressColors[descriptionStatus]}
                    />
                </div>

            </CardContent>

            {/* Подвал с кнопками */}
           <CardFooter className="flex-col-reverse gap-2 border-t bg-muted/30 px-5 py-3 sm:flex-row sm:justify-end">
                <Button
                    type="button"
                    variant="ghost"
                    onClick={onClear}
                    disabled={
                        !metaData.url &&
                        !metaData.title &&
                        !metaData.description &&
                        !metaData.h1
                    }
                >
                    Очистить
                </Button>

                <Button
                    type="button"
                    variant="outline"
                    onClick={handleCopy}
                    disabled={
                        !metaData.url &&
                        !metaData.title &&
                        !metaData.description &&
                        !metaData.h1
                    }
                >
                    {isCopied ? (
                        <Check className="size-4 text-success" />
                    ) : (
                        <Copy className="size-4" />
                    )}

                    {isCopied ? "Скопировано" : "Скопировать"}
                </Button>

                <Button
                    type="button"
                    onClick={onSubmit}
                    disabled={
                        !metaData.title &&
                        !metaData.description &&
                        !metaData.h1
                    }
                >
                    Проверить метатеги
                </Button>
            </CardFooter>
        </Card>
    );
};

export default MetaTagsForm;