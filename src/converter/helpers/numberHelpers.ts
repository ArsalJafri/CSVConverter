export function parseValidNumber(rawStringNumber: string) : number | undefined { return !isNaN(+rawStringNumber) && rawStringNumber.trim().length !== 0 ? +rawStringNumber : undefined }

export function parseReadCount(rawStringNumber: string) : number {return +rawStringNumber >= 0 && !isNaN(+rawStringNumber) && Number.isInteger(+rawStringNumber) ? +rawStringNumber : 0}
