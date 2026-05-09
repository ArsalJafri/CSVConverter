import type { RawStoryGraphRow, NormalizedBook } from './types';

function splitStringToList(rawString: string) : string[] {return rawString.split(",").map(item => item.trim()).filter(word => word.length > 0)}

function parseOptionalNumber(rawNumber: string) : number | undefined { return !isNaN(+rawNumber) && rawNumber.trim().length !== 0 ? +rawNumber : undefined }

 