type KeywordsPanelProps ={ 
    metaData: { title: string; description: string; h1: string; url: string }
    onChange: (field: string, value: string) => void
    onSubmit: () => void;
}

const MetaTagsForm = ({metaData, onChange, onSubmit }: KeywordsPanelProps) => {
    return (
        <div className="flex w-full flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white text-zinc-950 shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6 pb-4">
                <h3 className="font-semibold leading-none tracking-tight">Редактор метатегов</h3>
                <p className="text-sm text-zinc-500">Заполните данные для страницы</p>
            </div>

            {/* Контентная часть с полями ввода */}
            <div className="flex flex-col gap-4 p-6 pt-0">
                
                {/* Поле URL */}
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="url" className="text-sm font-medium leading-none">URL</label>
                    <input
                        id="url"
                        value={metaData.url}
                        onChange={(e)=>onChange ('url', e.target.value)}
                        type="text"
                        placeholder="https://site.ru/page/"
                        className="flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950"
                    />
                </div>

                {/* Поле H1 */}
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="h1" className="text-sm font-medium leading-none">Заголовок (H1)</label>
                    <input
                        id="h1"
                        value={metaData.h1}
                        onChange={(e)=>onChange ('h1', e.target.value)}
                        type="text"
                        placeholder="Главный заголовок на странице"
                        className="flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950"
                    />
                </div>

                {/* Поле Title */}
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="title" className="text-sm font-medium leading-none">Title</label>
                    <input
                        id="title"
                        value={metaData.title}
                        onChange={(e)=> onChange ('title', e.target.value)}
                        type="text"
                        placeholder="Оптимизированный Title для выдачи"
                        className="flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950"
                    />
                </div>

                {/* Поле Description */}
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="description" className="text-sm font-medium leading-none">Description</label>
                    <input
                        id="description"
                        value={metaData.description}
                        onChange={(e)=> onChange ('description', e.target.value)}
                        placeholder="Краткое описание страницы..."
                        className="flex min-h-20 w-full resize-none rounded-md border border-zinc-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 custom-scrollbar"
                    />
                </div>

            </div>

            {/* Подвал с кнопками */}
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 p-6 pt-0">
                
                <button
                    type="button"
                    className="inline-flex w-full sm:w-auto h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950"
                >
                    Очистить
                </button>

                <button
                    type="button"
                    className="inline-flex w-full sm:w-auto h-9 items-center justify-center rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950"
                >
                    Скопировать
                </button>
                
                <button
                    type="button"
                    className="inline-flex w-full sm:w-auto h-9 items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-50 shadow transition-colors hover:bg-zinc-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950"
                    onClick={onSubmit}
                >
                    Отправить
                </button>
                
            </div>
        </div>
    );
};

export default MetaTagsForm;