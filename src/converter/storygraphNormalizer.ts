import type { RawStoryGraphRow, NormalizedBook } from './types';
import { splitStringToList } from './helpers/listHelpers';
import { isOwned } from './helpers/booleanHelpers';
import { normalizeReadStatus, normalizeBookFormat, normalizeCharacterOrPlotDriven, normalizeMoods, normalizePace, normalizeTraitAnswer } from './helpers/restrictedValueHelpers';
import { parseReadCount, parseValidNumber } from './helpers/numberHelpers';
import { normalizeIsbnOrUid } from './helpers/identifierHelper';

export function normalizeStoryGraphRow(rawRow: RawStoryGraphRow): NormalizedBook {
    const identifier = normalizeIsbnOrUid(rawRow["ISBN/UID"]);
    const normalizedRow: NormalizedBook = {
        title: rawRow.Title, 
        authors: splitStringToList(rawRow.Authors), 
        contributors: splitStringToList(rawRow.Contributors), 

        isbn: identifier.isbn,
        isbn13: identifier.isbn13,  
        externalId: identifier.externalId, 

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
