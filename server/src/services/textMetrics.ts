import { waterWordsSet, stopWords }  from '../data/stopWords.js'
import {countLemmas, normalizeWords} from './morphology.js'

const clearString = (str: string) => {
    const regex = /[а-яёa-z0-9]+/gi
    const matches = [...str.matchAll(regex)]

    return matches.map(item => item[0].toLowerCase())
}

const waterPercent = (text: string) => {
    const words = clearString(text)
    const water = words.filter(word => waterWordsSet.has(word))
    if (words.length === 0) {
        return 0
    }
    const percent = water.length / words.length * 100
    return Math.round(percent * 10) / 10
}

const getAcademicNausea = (text: string) => {
    const words = clearString(text)
    const clearWords = words.filter(word => !stopWords.has(word))
    const wordsToLemmas = normalizeWords(clearWords)
    const lemmaCounts = Object.values(countLemmas(wordsToLemmas))
    if (lemmaCounts.length === 0) {
        return 0
    }
    const maxFrequency = Math.max(...lemmaCounts)

    const percent = maxFrequency / wordsToLemmas.length  * 100
    return Math.round(percent * 10) / 10
}

const getSpamPercent = (text: string) => {
    const words = clearString(text)
    const clearWords = words.filter(word => !stopWords.has(word))
    const wordsToLemmas = normalizeWords(clearWords)
    const lemmaCounts = Object.entries(countLemmas(wordsToLemmas))
    if (lemmaCounts.length === 0) {
        return 0
    }

    const densityCount = lemmaCounts.map(([lemma, count])=> {
        const density = count / wordsToLemmas.length * 100

        return {lemma,density}
    })

    const excess = densityCount.map(({lemma,density}) => {
        const excess = density > 3 ? density - 3 : 0

        return {
            lemma,
            density,
            excess
        }
    })
 
    const spamPercent = excess.reduce((acc, item) => {
        return acc + item.excess
        }, 0)

    return Math.round(spamPercent * 10) / 10
}

export {getSpamPercent, getAcademicNausea, waterPercent}