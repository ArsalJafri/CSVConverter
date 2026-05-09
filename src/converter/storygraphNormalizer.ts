import type { RawStoryGraphRow, NormalizedBook } from './types';

function splitStringIntoList(rawString: string) : string[] {return rawString.split(",").map(item => item.trim()).filter(word => word.length > 0)}