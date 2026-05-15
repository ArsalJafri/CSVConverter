
type BookIdentifier = {
  isbn: string;
  isbn13: string;
  externalId: string;
};

export function normalizeIsbnOrUid(rawStoryGraphId: string): BookIdentifier {
  const cleanedId = rawStoryGraphId.trim().replaceAll("-", "").replaceAll(" ", "");

  if (cleanedId.length === 0) {return { isbn: "", isbn13: "", externalId: "" };}

  if (/^\d{13}$/.test(cleanedId)) {return { isbn: "", isbn13: cleanedId, externalId: "" };}

  if (/^\d{9}[\dXx]$/.test(cleanedId)) {return { isbn: cleanedId.toUpperCase(), isbn13: "", externalId: "" };}

  return { isbn: "", isbn13: "", externalId: rawStoryGraphId.trim() };
}
