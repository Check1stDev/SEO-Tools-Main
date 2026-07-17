
import { useState } from "react";
import { FileText, Copy, Check } from "lucide-react";

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
    <div className="w-full max-w-xl border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden dark:border-gray-800 dark:bg-gray-950">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200 dark:bg-gray-900 dark:border-gray-800">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          <FileText className="w-4 h-4 text-gray-500" />
          Пример списка ключевых слов
        </div>
        <button
          onClick={handleCopy}
          className="inline-flex items-center justify-center p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-900 rounded-md transition-colors dark:hover:bg-gray-800 dark:hover:text-gray-100"
          title="Скопировать всё"
        >
          {isCopied ? (
            <Check className="w-4 h-4 text-green-600 dark:text-green-500" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Сам блок с текстом */}
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm text-gray-800 font-mono whitespace-pre-wrap dark:text-gray-200">
          {rawKeywords}
        </pre>
      </div>
      
    </div>
  );}