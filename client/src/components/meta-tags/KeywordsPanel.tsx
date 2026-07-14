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
        <div>
            <h2>Ключевые слова</h2>
            <textarea value={keysListState} onChange={handleChange}/>
            <button type="button" onClick={()=>setKeysListState('')}>Сбросить</button>
            <button type="button" onClick={()=>onSubmitKeywords(sendKeywords(keysListState))}>Отправить</button>
        </div>
    );
};

export default KeywordsPanel;