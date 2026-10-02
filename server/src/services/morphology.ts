import phpMorphy from "phpmorphy";
import { waterWordsSet, stopWords } from "../data/stopWords.js";

const morphy = new phpMorphy("ru");

type arrLemma = string[];

type LemmaItem = {
  word: string;
  lemma: string;
};

type morphyArrItem = [string, string[]];
type ProcessedResult = Record<string, LemmaItem[]>;

const clearString = (str: string) => {
  const arr = str.replace(/\p{P}/gu, "").trim().split(" ");
  return arr;
};

const clearStringWithIndex = (str: string) => {
  const regex = /[а-яёa-z0-9]+/gi;
  const matches = [...str.matchAll(regex)];

  return matches.map((match) => {
    return {
      word: match[0],
      lemma: match[0],
      index: match.index,
    };
  });
};

const normalizeWords = (arr: arrLemma) => {
  const morphyObj = morphy.lemmatize(arr);
  const morphyArr = Object.values(morphyObj) as string[][];
  const result = morphyArr.map((word, index) => {
    if (!word[0]) {
      return arr[index];
    }
    if (word[1]) {
      return word[1];
    }
    return word[0];
  });

  return result.map((word) => word!.toLowerCase()) as string[];
};

const countLemmas = (arr: arrLemma) => {
  return arr.reduce((acc: Record<string, number>, item: string) => {
    if (acc[item]) {
      acc[item] += 1;
    } else {
      acc[item] = 1;
    }
    return acc;
  }, {});
};

const mapWordsToLemmas = (arr: arrLemma): LemmaItem[] => {
  const morphyObj = morphy.lemmatize(arr);
  const morphyArr = Object.entries(morphyObj) as morphyArrItem[];
  return morphyArr.map(([key, value]) => {
    const lemma = value?.[0] ?? key;

    return { word: key.toLowerCase(), lemma: lemma.toLowerCase() };
  });
};

const processLemmatize = (
  payload: Record<string, string[]>,
): ProcessedResult => {
  const result: ProcessedResult = {};

  for (const [key, wordsArray] of Object.entries(payload)) {
    result[key] = mapWordsToLemmas(wordsArray);
  }
  return result;
};

const textToLemmas = (str: string) => {
  const lemmasText = clearStringWithIndex(str);
  const lemmasArr = lemmasText.map((item) => {
    return item.word;
  });

  const morphyObj = morphy.lemmatize(lemmasArr);

  const result = lemmasText.map((item) => {
    const lemmaItem = morphyObj[item.word.toUpperCase()];
    if (lemmaItem === false) {
      return {
        word: item.word,
        lemma: item.word.toUpperCase(),
        index: item.index,
      };
    }
    if (lemmaItem.length > 1) {
      return {
        word: item.word,
        lemma: lemmaItem[1],
        index: item.index,
      };
    }
    return {
      word: item.word,
      lemma: lemmaItem[0],
      index: item.index,
    };
  });

  return result.filter((item) => {
    return !stopWords.has(item.word.toLowerCase());
  });
};

const findKeyInText = (
  textLemmas: { word: string; lemma: string; index: number }[],
  keyLemmas: string[],
) => {
  const n = keyLemmas.length;
  if (n === 1) {
    return textLemmas
      .filter((item) => item.lemma === keyLemmas[0])
      .map((item) => [item]);
  }
  const result = [];
  const checkKeyLemmas = keyLemmas.sort();
  for (let i = 0; i <= textLemmas.length - n; i++) {
    const checkKey = textLemmas.slice(i, i + n);
    const keySliceValues = checkKey.map((item) => item.lemma);
    if (
      JSON.stringify(keySliceValues.sort()) === JSON.stringify(checkKeyLemmas)
    ) {
      result.push(checkKey);
    }
  }
  return result;
};

const searchAllKeywords = (text: string, keywords: string[]) => {
  const textLemmas = textToLemmas(text);
  return keywords.map((keyword) => {
    const keyLemmas = [
      ...new Set(textToLemmas(keyword).map((item) => item.lemma)),
    ];
    const matches = findKeyInText(textLemmas, keyLemmas);

    return { keyword, matches };
  });
};

const text = "Купить квартиру в Москве. Продажа квартир от застройщика.";
const keywords = ["купить квартиру", "квартира", "продажа квартир"];

console.log(JSON.stringify(searchAllKeywords(text, keywords), null, 2));

export {
  normalizeWords,
  countLemmas,
  mapWordsToLemmas,
  processLemmatize,
  searchAllKeywords,
};
