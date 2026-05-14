export type RawStoryGraphRow = {
  Title: string;
  Authors: string;
  Contributors: string;
  "ISBN/UID": string;
  Format: string;
  "Read Status": string;
  "Date Added": string;
  "Last Date Read": string;
  "Dates Read": string;
  "Read Count": string;
  Moods: string;
  Pace: string;
  "Character- or Plot-Driven?": string;
  "Strong Character Development?": string;
  "Loveable Characters?": string;
  "Diverse Characters?": string;
  "Flawed Characters?": string;
  "Star Rating": string;
  Review: string;
  "Content Warnings": string;
  "Content Warning Description": string;
  Tags: string;
  "Owned?": string;
};

export type BookFormat =
  | "paperback"
  | "hardcover"
  | "audio"
  | "digital"
  | "unknown";

export type ReadingStatus =
  | "read"
  | "to-read"
  | "did-not-finish"
  | "paused"
  | "currently-reading"
  | "unknown";

export type Pace =
  | "fast"
  | "medium"
  | "slow"
  | "unknown";

export type Mood =
  | "lighthearted"
  | "adventurous"
  | "challenging"
  | "dark"
  | "emotional"
  | "funny"
  | "hopeful"
  | "inspiring"
  | "informative"
  | "mysterious"
  | "reflective"
  | "relaxing"
  | "sad"
  | "tense"
  | "unknown";

export type CharacterOrPlotDriven =
  | "character"
  | "mix"
  | "plot"
  | "unknown";

export type StoryGraphTraitAnswer =
  | "yes"
  | "no"
  | "complicated"
  | "unknown";

export type NormalizedBook = {
  title: string;
  authors: string[];
  contributors: string[];

  isbn: string;
  isbn13: string, 
  externalId: string;

  format: BookFormat;
  readStatus: ReadingStatus;

  dateAdded: string;
  lastDateRead: string;
  datesRead: string[];

  readCount: number;

  moods: Mood[];
  pace: Pace;

  characterOrPlotDriven: CharacterOrPlotDriven;
  strongCharacterDevelopment: StoryGraphTraitAnswer;
  loveableCharacters: StoryGraphTraitAnswer;
  diverseCharacters: StoryGraphTraitAnswer;
  flawedCharacters: StoryGraphTraitAnswer;

  starRating?: number;

  review: string;

  contentWarnings: string[];
  contentWarningDescription: string;

  tags: string[];

  owned: boolean;
};

export type GoodReadsRow = {
    "Book Id": string; 
    Title: string;
    Author: string;
    "Author l-f": string;
    "Additional Authors": string;
    ISBN: string;
    ISBN13: string;
    "My Rating": string;
    "Average Rating": string;
    Publisher: string;
    Binding: string;
    "Number of Pages": string;
    "Year Published": string;
    "Original Publication Year": string;
    "Date Read": string;
    "Date Added": string;
    Bookshelves: string;
    "Bookshelves with positions": string;
    "Exclusive Shelf": string;
    "My Review": string;
    Spoiler: string;
    "Private Notes": string;
    "Read Count": string;
    "Owned Copies": string;
};