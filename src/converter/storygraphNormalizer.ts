import type { RawStoryGraphRow, NormalizedBook } from './types';

function splitStringToList(rawString: string) : string[] {return rawString.split(",").map(item => item.trim()).filter(word => word.length > 0)}

function parseValidNumber(rawStringNumber: string) : number | undefined { return !isNaN(+rawStringNumber) && rawStringNumber.trim().length !== 0 ? +rawStringNumber : undefined }

function parseReadCount(rawStringNumber: string) : number {return +rawStringNumber > 0 && !isNaN(+rawStringNumber) && Number.isInteger(+rawStringNumber) ? +rawStringNumber : 0}

function isOwned(ownedText: string) : boolean {return ownedText.trim().toLowerCase() === "yes"}

function validateReadStatus(status: string) : string {
    const listOfStatus: string[] = ["read", "to-read", "did-not-finish", "paused", "currently-reading"]

    return listOfStatus.includes(status) ? status: "unknown"
}

function normalizeReadStatus(bookStatus: string) : string { return validateReadStatus(bookStatus.trim().toLowerCase())}

