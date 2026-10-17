import photoFiles from "./photos.json";

export const validationQuestions = [
  {
    eyebrow: "Identity check",
    question: "Are you Patricia Tolentino?",
    hint: "Only one person gets to open what is waiting here.",
    choices: ["Yes, that's me", "No, wrong person"],
    answer: "Yes, that's me",
    error: "This little universe is only for Patricia. Nice try, though. ♡",
  },
  {
    eyebrow: "Heart check",
    question: "What is your callsign with Gideon Magsanoc?",
    hint: "The word that makes every ordinary day feel softer.",
    choices: ["Love", "Mahal", "Babe", "Hon"],
    answer: "Love",
    error: "Close, but that's not our secret answer. Follow your heart, Love.",
  },
  {
    eyebrow: "One last secret",
    question: "What is the name of Gideon's favorite dog?",
    hint: "Four paws. One very unforgettable name.",
    choices: ["Molly", "Luna", "Max", "Bruno"],
    answer: "Molly",
    error: "Almost! Think of the dog whose name Gideon will never forget.",
  },
];

export const memories = photoFiles.map((filename, index) => ({
  src: `${import.meta.env.BASE_URL}photos/${encodeURIComponent(filename)}`,
  label: "A moment worth keeping",
  date: `Memory ${String(index + 1).padStart(2, "0")}`,
}));

export const milestones = [
  {
    number: "01",
    title: "The beginning",
    copy: "Nagsimula tayo bilang dalawang best friends, never knowing na one day, magiging something more tayo.",
  },
  {
    number: "02",
    title: "The becoming",
    copy: "Somewhere between those countless memories, kahit mahirap sa side mo, sinubukan mo kong mahalin ng higit pa sa kaibigan.",
  },
  {
    number: "03",
    title: "The choosing",
    copy: "Sa bawat saya at hirap, natutunan nating piliin ang isa’t isa, araw-araw.",
  },
  {
    number: "04",
    title: "Our forever",
    copy: "Four years later, we’re still here, creating new memories and continuing the story that started with two best friends.",
  },
];
