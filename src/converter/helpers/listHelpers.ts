export function splitStringToList(rawString: string) : string[] {return rawString.split(",").map(item => item.trim()).filter(word => word.length > 0)}
