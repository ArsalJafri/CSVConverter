import { ReadingStatus, BookFormat, Pace, Mood, CharacterOrPlotDriven, StoryGraphTraitAnswer } from '../types';

import { splitStringToList } from "./listHelpers";

export function validateReadStatus(status: string) : ReadingStatus {
    const listOfStatus: ReadingStatus[] = ["read", "to-read", "did-not-finish", "paused", "currently-reading"]

    return listOfStatus.includes(status as ReadingStatus) ? status as ReadingStatus: "unknown"
}

export function normalizeReadStatus(bookStatus: string) : ReadingStatus { return validateReadStatus(bookStatus.trim().toLowerCase())}

export function validateBookFormat(format: string): BookFormat {
    const listOfFormats: BookFormat[] = ["paperback", "hardcover", "audio", "digital", "unknown"]

    return listOfFormats.includes(format as BookFormat) ? format as BookFormat : "unknown"
}

export function normalizeBookFormat(format: string): BookFormat {
    return validateBookFormat(format.trim().toLowerCase())
}

export function validatePace(pace: string): Pace {
    const listOfPaces: Pace[] = ["fast", "medium", "slow", "unknown"]

    return listOfPaces.includes(pace as Pace) ? pace as Pace : "unknown"
}

export function normalizePace(pace: string): Pace {
    return validatePace(pace.trim().toLowerCase())
}

export function validateMood(mood: string): Mood {
    const listOfMoods: Mood[] = [
        "lighthearted",
        "adventurous",
        "challenging",
        "dark",
        "emotional",
        "funny",
        "hopeful",
        "inspiring",
        "informative",
        "mysterious",
        "reflective",
        "relaxing",
        "sad",
        "tense",
        "unknown"
    ]

    return listOfMoods.includes(mood as Mood) ? mood as Mood : "unknown"
}

export function normalizeMoods(moods: string): Mood[] {
    return splitStringToList(moods).map(mood => validateMood(mood.trim().toLowerCase()))
}

export function validateCharacterOrPlotDriven(value: string): CharacterOrPlotDriven {
    const listOfOptions: CharacterOrPlotDriven[] = ["character", "mix", "plot", "unknown"]

    return listOfOptions.includes(value as CharacterOrPlotDriven) ? value as CharacterOrPlotDriven : "unknown"
}

export function normalizeCharacterOrPlotDriven(value: string): CharacterOrPlotDriven {
    const cleanedValue = value.trim().toLowerCase()

    if (cleanedValue === "a mix") {
        return "mix"
    }

    return validateCharacterOrPlotDriven(cleanedValue)
}

export function validateTraitAnswer(answer: string): StoryGraphTraitAnswer {
    const listOfAnswers: StoryGraphTraitAnswer[] = ["yes", "no", "complicated", "unknown"]

    return listOfAnswers.includes(answer as StoryGraphTraitAnswer) ? answer as StoryGraphTraitAnswer : "unknown"
}

export function normalizeTraitAnswer(answer: string): StoryGraphTraitAnswer {
    const cleanedAnswer = answer.trim().toLowerCase()

    if (cleanedAnswer === "it's complicated") {
        return "complicated"
    }

    return validateTraitAnswer(cleanedAnswer)
}
