/**
 * ПАМЯТКА ПО СТРУКТУРЕ ДАННЫХ
 * * --- Ввод ---
 * @param keywordsText
 * @param title
 * @param description
 * @param h1
 * * --- Результаты анализа ---
 * @returns lemmaCounts
 * @returns метатеги с привязкой слов к леммам
 * * --- Интерфейс ---
 * @property activeLemma
 */

/**
 *  ПАМЯТКА: ЗАПРОСЫ К БЭКЕНДУ (API)
 * Отправляет текст с ключевыми словами на бэкенд для анализа лемм.
 * * @param {string} keywordsText - Текст или список ключевых фраз.
 * @returns {Promise<any>} Ответ бэкенда (например, lemmaCounts).
 */
/**const analyzeKeywords = async (keywordsText) => {
  // логика запроса...
};

/**
 * Отправляет метатеги страницы на бэкенд для анализа привязки слов к леммам.
 * * @param {Object} params - Объект с мета-данными.
 * @param {string} params.title - Тег Title.
 * @param {string} params.description - Тег Description.
 * @param {string} params.h1 - Заголовок H1.
 * @returns {Promise<any>} Ответ бэкенда с результатами анализа.
 */
/**const analyzeMetaFields = async ({ title, description, h1 }) => {
  // логика запроса...
};*/
import KeywordsPanel from '@/components/meta-tags/KeywordsPanel'
import { useContext, useState } from 'react'
import { ProjectContext } from '@/context/ProjectContext'
import { useMutation } from '@tanstack/react-query'
import {submitKeywords} from '@/api/lemmas'

export default function MetaTags(){
    const [lemmasList, setLemmasList] = useState<Record<string, number>>({});
    const context = useContext(ProjectContext)
        if(!context) return null
    const { activeProject } = context

    const submitKeys =  useMutation({
        mutationFn: async (arr: string[]) => {
            const result = await submitKeywords(activeProject!.id, arr) 
            return result
        },
        onSuccess: (data) => {
            setLemmasList(data.data)
        }
        })

    const handleSubmitKeywords = (arr: string[]) => {
        submitKeys.mutate(arr)
    }


    return(
        <KeywordsPanel onSubmitKeywords={handleSubmitKeywords} />
    )
}
