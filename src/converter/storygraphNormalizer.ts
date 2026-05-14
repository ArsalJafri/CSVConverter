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


type BookIdentifier = {
  isbn: string;
  isbn13: string;
  externalId: string;
};

function normalizeIsbnOrUid(rawStoryGraphId: string): BookIdentifier {
  const cleanedId = rawStoryGraphId.trim();

  if (cleanedId.length === 0) { return { isbn: "", isbn13: "", externalId: "" }; }

  if (cleanedId.length === 13) { return { isbn: "", isbn13: cleanedId, externalId: "" }; }

  if (cleanedId.length === 10) { return { isbn: cleanedId, isbn13: "", externalId: "" }; }

  return { isbn: "", isbn13: "", externalId: cleanedId };
}

function normalizeStoryGraphRow(rawRow: RawStoryGraphRow): NormalizedBook {
    const identifier = normalizeIsbnOrUid(rawRow["ISBN/UID"]);
    const normalizedRow: NormalizedBook = {
        title: rawRow.Title, 
        authors: splitStringToList(rawRow.Authors), 
        contributors: splitStringToList(rawRow.Contributors), 

        isbn: identifier.isbn,
        isbn13: identifier.isbn13,  
        externalId: rawRow["ISBN/UID"], 

        format: normalizeBookFormat(rawRow.Format), 

        readStatus: normalizeReadStatus(rawRow["Read Status"]), 

        dateAdded: rawRow["Date Added"],
        lastDateRead: rawRow["Last Date Read"],
        datesRead: splitStringToList(rawRow["Dates Read"]),

        readCount: parseReadCount(rawRow["Read Count"]), 

        moods: normalizeMoods(rawRow.Moods), 
        pace: normalizePace(rawRow.Pace), 

        characterOrPlotDriven: normalizeCharacterOrPlotDriven(rawRow["Character- or Plot-Driven?"]), 
        strongCharacterDevelopment: normalizeTraitAnswer(rawRow["Strong Character Development?"]),
        loveableCharacters: normalizeTraitAnswer(rawRow["Loveable Characters?"]),
        diverseCharacters: normalizeTraitAnswer(rawRow["Diverse Characters?"]),
        flawedCharacters: normalizeTraitAnswer(rawRow["Flawed Characters?"]),

        starRating: parseValidNumber(rawRow["Star Rating"]), 
        review: rawRow.Review, 

        contentWarnings: splitStringToList(rawRow["Content Warnings"]), 
        contentWarningDescription: rawRow["Content Warning Description"], 
        
        tags: splitStringToList(rawRow.Tags), 
        owned: isOwned(rawRow["Owned?"]), 
    }

    return normalizedRow
}
