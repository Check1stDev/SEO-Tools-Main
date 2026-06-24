type KeywordValue = {
    projectId: number
    keyword: string
    position: number
    searchEngine: string
    }

type Props = {
    data: KeywordValue[]
}

const KeywordRow = ({ keyword, position, searchEngine }: KeywordValue) => {
    const getPositionColor = (position: number) => {
        if (position <= 3) return "bg-green-100 text-green-800 border-green-200";
        if (position <= 10) return "bg-yellow-100 text-yellow-800 border-yellow-200";
        return "bg-gray-100 text-gray-600 border-gray-200";
    }

    return (
    <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-100 items-center hover:bg-gray-50 transition-colors">

      <div className="col-span-6 font-medium text-gray-900 truncate">
        {keyword}
      </div>

      <div className="col-span-3 text-sm text-gray-500">
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
          searchEngine === 'Google' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'
        }`}>
          {searchEngine}
        </span>
      </div>

      <div className="col-span-3 text-right">
        <span className={`px-3 py-1 rounded-lg border font-bold ${getPositionColor(position)}`}>
          #{position}
        </span>
      </div>
    </div>
  );
}

export default function KeywordsTable ({data}: Props) {
    return (
    <div className="w-full max-w-2xl bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200 font-semibold text-gray-700">
        Позиции ключевых слов
      </div>
      {data.map((item,index) => (
        <KeywordRow 
          key={index} 
          projectId={item.projectId}
          keyword={item.keyword} 
          position={item.position} 
          searchEngine={item.searchEngine} 
        />       
      ))}
      </div>
    )
}

export type {
    KeywordValue
}