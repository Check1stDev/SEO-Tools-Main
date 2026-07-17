type SnippetPreviewBlockProps = {
    title?: string;
    url?: string;
    description?: string;
}

const SnippetPreviewBlock = ({
    title = "Купить квартиру в Москве от 7,5 млн руб., продажа квартир во...",
    url = "cian.ru › kupit-kvartiru/",
    description = "Продажа квартир в Москве от 7,5 млн руб. Найдено 89 832 объявления. Абсолютно новая квартира! Панорамные виды на Москва-Сити и Триумфальную арку. Архитектурный проект Diamond Ray. Есть места в Москве, которые становятся частью образа жизни."
}: SnippetPreviewBlockProps) => {
    
    const truncateSmart = (str: string, maxLeng: number): string => {
        if (str.length <= maxLeng) return str

        const slised = str.slice(0,maxLeng)

        const lastSpaceIdex =  slised.lastIndexOf('')

        if (lastSpaceIdex > 0) {
            return slised.slice(0, lastSpaceIdex) + '...'
        }

        return slised + '...'
    }

    return (
        <div className="flex w-full flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white text-zinc-950 shadow-sm">

            <div className="flex-none p-6 pb-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold leading-none tracking-tight">Пример сниппета</h3>
                    <span className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-semibold text-zinc-900">
                        Yandex Desktop
                    </span>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto px-6 pb-6 min-h-0">
                
                <div className="max-w-150 font-sans">
                    <div className="flex items-start gap-2 mb-1">
                        <div className="mt-1 shrink-0 text-blue-600">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2a10 10 0 0 0-7.38 16.75"/>
                                <path d="M12 22a10 10 0 0 0 7.38-3.25"/>
                                <path d="M12 2v20"/>
                                <path d="M2 12h20"/>
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                            </svg>
                        </div>
                        <a 
                            href="#" 
                            className="text-[18px] sm:text-[20px] font-medium leading-[1.2] text-[#001bc2] hover:text-[#cc0000] line-clamp-2"
                        >
                            {truncateSmart(title, 70)}
                        </a>
                    </div>
                    <div className="mb-1 ml-6 text-[13px] sm:text-[14px] text-[#006000] truncate">
                        {truncateSmart(url, 70)}
                    </div>
                    <div className="ml-6 text-[13px] sm:text-[14px] leading-[1.4] text-[#333333] line-clamp-3">
                        {truncateSmart(description,160)}
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default SnippetPreviewBlock;