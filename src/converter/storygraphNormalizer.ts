import type { RawStoryGraphRow, NormalizedBook, ReadingStatus, CharacterOrPlotDriven, Mood, Pace, BookFormat, StoryGraphTraitAnswer } from './types';

function splitStringToList(rawString: string) : string[] {return rawString.split(",").map(item => item.trim()).filter(word => word.length > 0)}

function parseValidNumber(rawStringNumber: string) : number | undefined { return !isNaN(+rawStringNumber) && rawStringNumber.trim().length !== 0 ? +rawStringNumber : undefined }

function parseReadCount(rawStringNumber: string) : number {return +rawStringNumber >= 0 && !isNaN(+rawStringNumber) && Number.isInteger(+rawStringNumber) ? +rawStringNumber : 0}

function isOwned(ownedText: string) : boolean {return ownedText.trim().toLowerCase() === "yes"}

function validateReadStatus(status: string) : ReadingStatus {
    const listOfStatus: ReadingStatus[] = ["read", "to-read", "did-not-finish", "paused", "currently-reading"]

    return listOfStatus.includes(status as ReadingStatus) ? status as ReadingStatus: "unknown"
}

function normalizeReadStatus(bookStatus: string) : ReadingStatus { return validateReadStatus(bookStatus.trim().toLowerCase())}

function validateBookFormat(format: string): BookFormat {
    const listOfFormats: BookFormat[] = ["paperback", "hardcover", "audio", "digital", "unknown"]

    return listOfFormats.includes(format as BookFormat) ? format as BookFormat : "unknown"
}

function normalizeBookFormat(format: string): BookFormat {
    return validateBookFormat(format.trim().toLowerCase())
}

function validatePace(pace: string): Pace {
    const listOfPaces: Pace[] = ["fast", "medium", "slow", "unknown"]

    return listOfPaces.includes(pace as Pace) ? pace as Pace : "unknown"
}

function normalizePace(pace: string): Pace {
    return validatePace(pace.trim().toLowerCase())
}

function validateMood(mood: string): Mood {
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

function normalizeMoods(moods: string): Mood[] {
    return splitStringToList(moods).map(mood => validateMood(mood.trim().toLowerCase()))
}

function validateCharacterOrPlotDriven(value: string): CharacterOrPlotDriven {
    const listOfOptions: CharacterOrPlotDriven[] = ["character", "mix", "plot", "unknown"]

    return listOfOptions.includes(value as CharacterOrPlotDriven) ? value as CharacterOrPlotDriven : "unknown"
}

function normalizeCharacterOrPlotDriven(value: string): CharacterOrPlotDriven {
    const cleanedValue = value.trim().toLowerCase()

    if (cleanedValue === "a mix") {
        return "mix"
    }

    return validateCharacterOrPlotDriven(cleanedValue)
}

function validateTraitAnswer(answer: string): StoryGraphTraitAnswer {
    const listOfAnswers: StoryGraphTraitAnswer[] = ["yes", "no", "complicated", "unknown"]

    return listOfAnswers.includes(answer as StoryGraphTraitAnswer) ? answer as StoryGraphTraitAnswer : "unknown"
}

function normalizeTraitAnswer(answer: string): StoryGraphTraitAnswer {
    const cleanedAnswer = answer.trim().toLowerCase()

    if (cleanedAnswer === "it's complicated") {
        return "complicated"
    }

    return validateTraitAnswer(cleanedAnswer)
}

