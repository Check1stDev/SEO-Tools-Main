
import { useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, Copy, Check } from "lucide-react"

// Собираем текст через join('\n'), чтобы избежать проблем с отступами (табами) в коде
const rawKeywords = [
  "купить квартиру",
  "покупка квартиры",
  "купить дом",
  "купить дома",
  "дома купить",
  "продажа квартиры",
  "продать квартиру",
  "ремонт квартиры",
  "ремонт квартир",
  "строительство дома",
  "строительство домов",
  "строить дом",
  "строитель дома",
  "проект дома",
  "проектирование домов"
].join("\n");

export function KeywordsRawBlock() {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(rawKeywords);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Card className="w-full overflow-hidden py-0">
      <CardHeader className="border-b bg-muted/30 px-5 py-4">
          <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2">
                  <FileText className="size-4 shrink-0 text-brand-blue" />

                  <CardTitle className="truncate text-sm font-medium">
                      Пример списка ключевых слов
                  </CardTitle>
              </div>

              <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className={
                      isCopied
                          ? "size-8 text-success hover:text-success"
                          : "size-8 text-muted-foreground"
                  }
                  onClick={handleCopy}
                  aria-label={isCopied ? "Скопировано" : "Скопировать ключевые слова"}
              >
                  {isCopied ? (
                      <Check className="size-4" />
                  ) : (
                      <Copy className="size-4" />
                  )}
              </Button>
          </div>
      </CardHeader>

      {/* Сам блок с текстом */}
      <CardContent className="p-0">
          <ScrollArea className="h-72">
              <pre className="whitespace-pre-wrap break-words p-5 font-mono text-sm leading-6 text-foreground">
                  {rawKeywords}
              </pre>
          </ScrollArea>
      </CardContent>
    </Card>
  );}