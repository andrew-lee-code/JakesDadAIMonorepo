/**
 * Mock Data for UX Mockups
 *
 * This file contains realistic mock data for testing mockups.
 * Use actual league member names and realistic statistics.
 */

// League member names
export const leagueMembers = [
  "Andrew",
  "Jake",
  "Craig",
  "Taylor",
  "Ben",
  "Zach",
  "Nick",
  "Matt",
  "Chris",
  "Ryan",
];

// Mock owner data with statistics
export const mockOwners = leagueMembers.map((name) => ({
  owner_name: name,
  avatar: `/images/owner_pictures/${name.toLowerCase()}.webp`,
  championships: Math.floor(Math.random() * 3),
  seasons_played: 10 + Math.floor(Math.random() * 5),
  total_wins: 50 + Math.floor(Math.random() * 50),
  total_losses: 40 + Math.floor(Math.random() * 40),
  playoff_appearances: 3 + Math.floor(Math.random() * 7),
  total_points_scored: 10000 + Math.floor(Math.random() * 5000),
  total_points_against: 10000 + Math.floor(Math.random() * 5000),
}));

// Mock champion data
export const mockChampion = {
  name: "Andrew",
  avatar: "/images/owner_pictures/andrew.webp",
  year: 2025,
};

export const mockUltimateLoser = {
  name: "Jake",
  avatar: "/images/owner_pictures/jake.webp",
  year: 2025,
};

// Mock weekly matchup data
export const mockMatchups = [
  {
    week: 1,
    team1: { name: "Andrew", score: 142.5, projected: 138.2 },
    team2: { name: "Jake", score: 128.3, projected: 135.1 },
  },
  {
    week: 1,
    team1: { name: "Craig", score: 155.2, projected: 145.0 },
    team2: { name: "Taylor", score: 118.7, projected: 132.5 },
  },
  {
    week: 1,
    team1: { name: "Ben", score: 133.8, projected: 140.3 },
    team2: { name: "Zach", score: 145.1, projected: 142.8 },
  },
];

// Mock standings data
export const mockStandings = mockOwners
  .map((owner) => ({
    ...owner,
    win_percentage:
      owner.total_wins / (owner.total_wins + owner.total_losses),
    points_for_avg:
      owner.total_points_scored / owner.seasons_played / 14,
    rank: 0,
  }))
  .sort((a, b) => b.win_percentage - a.win_percentage)
  .map((owner, index) => ({ ...owner, rank: index + 1 }));

// Mock GOATS/WOATS category results
export const mockGoatsWoats = {
  ringGawd: {
    goats: [
      { name: "Andrew", value: 3, displayValue: "3 Rings", rank: 1 },
      { name: "Craig", value: 2, displayValue: "2 Rings", rank: 2 },
      { name: "Ben", value: 1, displayValue: "1 Ring", rank: 3 },
    ],
    woats: [
      { name: "Jake", value: 0, displayValue: "0 Rings", rank: 1 },
      { name: "Taylor", value: 0, displayValue: "0 Rings", rank: 1 },
      { name: "Matt", value: 0, displayValue: "0 Rings", rank: 1 },
    ],
  },
  winPercentage: {
    goats: [
      { name: "Andrew", value: 0.65, displayValue: "65%", rank: 1 },
      { name: "Craig", value: 0.58, displayValue: "58%", rank: 2 },
      { name: "Zach", value: 0.55, displayValue: "55%", rank: 3 },
    ],
    woats: [
      { name: "Jake", value: 0.35, displayValue: "35%", rank: 1 },
      { name: "Taylor", value: 0.38, displayValue: "38%", rank: 2 },
      { name: "Nick", value: 0.42, displayValue: "42%", rank: 3 },
    ],
  },
};

// Mock league lore/history entries
export const mockLeagueLore = [
  {
    year: 2024,
    title: "The Comeback Kid",
    description:
      "Andrew came back from 0-5 to win the championship, defying all odds.",
    type: "legendary",
  },
  {
    year: 2023,
    title: "The Trade That Shook the League",
    description:
      "Craig traded away his entire bench for a single player. It worked.",
    type: "trade",
  },
  {
    year: 2022,
    title: "Monday Night Miracle",
    description:
      "Jake needed 47 points from his Monday night player. He got 47.1.",
    type: "game",
  },
];

// Empty state examples
export const emptyStates = {
  noMatchups: [],
  noHistory: [],
  noStats: null,
};

// Edge case examples
export const edgeCases = {
  longName: "Christopher Michael Thompson III",
  tiedScores: [
    { name: "Andrew", score: 125.5 },
    { name: "Jake", score: 125.5 },
  ],
  maxChampionships: 5,
  zeroStats: {
    wins: 0,
    losses: 14,
    championships: 0,
  },
};

// Home Screen Redesign Mock Data
export const homeRedesignData = {
  leagueYear: 2025,
  leagueName: "Jake's Dad",
  tagline: "Where dreams go to die and excuses are born",

  champion: {
    name: "Craig",
    teamName: "Sxy Bane",
    avatar: "/images/owner_pictures/craig.webp",
    record: "11-3",
    playoffSeed: 2,
    championshipScore: "142.5 - 128.3",
    titleCount: 2,
    roastQuote: "Even a broken clock is right twice a day",
  },

  ultimateLoser: {
    name: "Dalton",
    teamName: "Dalton's Disasters",
    avatar: "/images/owner_pictures/dalton.webp",
    record: "3-11",
    toiletBowlScore: "89.2 - 92.1",
    loserCount: 1,
    shameQuote: "At least he's consistent... consistently terrible",
  },

  personalityAwards: [
    {
      id: "sweetheart",
      title: "League Sweetheart",
      subtitle: "Nicest Guy Award",
      winner: "Craig",
      teamName: "Sxy Bane",
      avatar: "/images/owner_pictures/craig.webp",
      reason: "Never trash talks, always says 'good game'",
      emoji: "heart",
      accentColor: "#FF69B4",
    },
    {
      id: "bitchy",
      title: "Most Bitchy",
      subtitle: "Complainer-in-Chief",
      winner: "Taylor",
      teamName: "Taylor's Tantrums",
      avatar: "/images/owner_pictures/taylor.webp",
      reason: "Filed 47 official complaints this season",
      emoji: "rage",
      accentColor: "#8B4513",
    },
    {
      id: "lucky",
      title: "Luckiest SOB",
      subtitle: "Fantasy Gods' Favorite",
      winner: "Jake",
      teamName: "Jake's Flukes",
      avatar: "/images/owner_pictures/jake.webp",
      reason: "Won 6 games by less than 5 points",
      emoji: "four_leaf_clover",
      accentColor: "#10b981",
    },
    {
      id: "unlucky",
      title: "Most Cursed",
      subtitle: "The Universe Hates Him",
      winner: "Ben",
      teamName: "Ben's Bad Beats",
      avatar: "/images/owner_pictures/ben.webp",
      reason: "Highest points against in league history",
      emoji: "skull",
      accentColor: "#6366f1",
    },
  ],

  navigation: [
    {
      label: "Hardware Store",
      path: "/hardware-store",
      description: "Where champions shop",
      icon: "trophy"
    },
    {
      label: "League Members",
      path: "/members",
      description: "Know thy enemy",
      icon: "people"
    },
    {
      label: "Analytics",
      path: "/analytics",
      description: "Numbers that hurt",
      icon: "chart"
    },
    {
      label: "League Lore",
      path: "/league-lore",
      description: "The sacred texts",
      icon: "book"
    },
    {
      label: "By-Laws",
      path: "https://docs.google.com/document/d/1pJQ_SrG_yooaJzuMaXOznfc_lNiDYxmY/edit",
      description: "The rules we ignore",
      icon: "document",
      external: true
    },
  ],

  recentDrama: [
    "Craig refuses to accept his 'Sweetheart' title",
    "Taylor's 3rd complaint this week denied by commissioner",
    "Dalton seen studying waiver wire tutorials at 2am",
  ],
};

// Hardware Store Mock Data
export const hardwareStoreData = {
  champions: [
    {
      owner_name: "Andrew",
      num_playoff_championships: 3,
      num_reg_szn_championships: 4,
      total_hardware: 7,
    },
    {
      owner_name: "Craig",
      num_playoff_championships: 2,
      num_reg_szn_championships: 2,
      total_hardware: 4,
    },
    {
      owner_name: "Zach",
      num_playoff_championships: 2,
      num_reg_szn_championships: 1,
      total_hardware: 3,
    },
    {
      owner_name: "Ben",
      num_playoff_championships: 1,
      num_reg_szn_championships: 2,
      total_hardware: 3,
    },
    {
      owner_name: "Taylor",
      num_playoff_championships: 1,
      num_reg_szn_championships: 1,
      total_hardware: 2,
    },
    {
      owner_name: "Jake",
      num_playoff_championships: 0,
      num_reg_szn_championships: 1,
      total_hardware: 1,
    },
    {
      owner_name: "Nick",
      num_playoff_championships: 0,
      num_reg_szn_championships: 0,
      total_hardware: 0,
    },
    {
      owner_name: "Matt",
      num_playoff_championships: 0,
      num_reg_szn_championships: 0,
      total_hardware: 0,
    },
  ],

  losers: [
    {
      owner_name: "Jake",
      num_ultimate_losers: 3,
      num_reg_szn_losers: 2,
      total_shame: 5,
    },
    {
      owner_name: "Taylor",
      num_ultimate_losers: 2,
      num_reg_szn_losers: 2,
      total_shame: 4,
    },
    {
      owner_name: "Nick",
      num_ultimate_losers: 1,
      num_reg_szn_losers: 2,
      total_shame: 3,
    },
    {
      owner_name: "Matt",
      num_ultimate_losers: 1,
      num_reg_szn_losers: 1,
      total_shame: 2,
    },
    {
      owner_name: "Ben",
      num_ultimate_losers: 1,
      num_reg_szn_losers: 0,
      total_shame: 1,
    },
  ],

  stats: {
    totalChampionships: 9,
    totalRegSeasonTitles: 11,
    mostDominantOwner: "Andrew",
    mostShameCount: 5,
    mostShamefulOwner: "Jake",
  },

  roastQuotes: {
    champions: [
      "Where legends are forged and egos inflated",
      "These sacred halls honor only the worthy",
      "Glory, immortalized in bar charts",
    ],
    losers: [
      "The Wall of Shame™ - Preserving mediocrity since 2015",
      "Not all heroes wear capes. Some wear participation trophies.",
      "Excellence in failure, consistency in defeat",
    ],
  },

  // Year-by-year Hall of Fame
  yearByYear: [
    {
      year: 2025,
      champion: { name: "Andrew", teamName: "Andrew's Avengers", avatar: "/images/owner_pictures/andrew.webp" },
      loser: { name: "Jake", teamName: "Jake's Jokes", avatar: "/images/owner_pictures/jake.webp" },
      regularSeasonChamp: { name: "Craig", teamName: "Sxy Bane", avatar: "/images/owner_pictures/craig.webp" },
      regularSeasonLoser: { name: "Nick", teamName: "Nick's Nightmares", avatar: "/images/owner_pictures/nick.webp" },
    },
    {
      year: 2024,
      champion: { name: "Craig", teamName: "Sxy Bane", avatar: "/images/owner_pictures/craig.webp" },
      loser: { name: "Taylor", teamName: "Taylor's Tears", avatar: "/images/owner_pictures/taylor.webp" },
      regularSeasonChamp: { name: "Andrew", teamName: "Andrew's Avengers", avatar: "/images/owner_pictures/andrew.webp" },
      regularSeasonLoser: { name: "Matt", teamName: "Matt's Mayhem", avatar: "/images/owner_pictures/matt.webp" },
    },
    {
      year: 2023,
      champion: { name: "Zach", teamName: "Zach Attack", avatar: "/images/owner_pictures/zach.webp" },
      loser: { name: "Nick", teamName: "Nick's Nightmares", avatar: "/images/owner_pictures/nick.webp" },
      regularSeasonChamp: { name: "Zach", teamName: "Zach Attack", avatar: "/images/owner_pictures/zach.webp" },
      regularSeasonLoser: { name: "Jake", teamName: "Jake's Jokes", avatar: "/images/owner_pictures/jake.webp" },
    },
    {
      year: 2022,
      champion: { name: "Andrew", teamName: "Andrew's Avengers", avatar: "/images/owner_pictures/andrew.webp" },
      loser: { name: "Jake", teamName: "Jake's Jokes", avatar: "/images/owner_pictures/jake.webp" },
      regularSeasonChamp: { name: "Ben", teamName: "Ben's Beasts", avatar: "/images/owner_pictures/ben.webp" },
      regularSeasonLoser: { name: "Taylor", teamName: "Taylor's Tears", avatar: "/images/owner_pictures/taylor.webp" },
    },
    {
      year: 2021,
      champion: { name: "Zach", teamName: "Zach Attack", avatar: "/images/owner_pictures/zach.webp" },
      loser: { name: "Matt", teamName: "Matt's Mayhem", avatar: "/images/owner_pictures/matt.webp" },
      regularSeasonChamp: { name: "Andrew", teamName: "Andrew's Avengers", avatar: "/images/owner_pictures/andrew.webp" },
      regularSeasonLoser: { name: "Nick", teamName: "Nick's Nightmares", avatar: "/images/owner_pictures/nick.webp" },
    },
    {
      year: 2020,
      champion: { name: "Ben", teamName: "Ben's Beasts", avatar: "/images/owner_pictures/ben.webp" },
      loser: { name: "Taylor", teamName: "Taylor's Tears", avatar: "/images/owner_pictures/taylor.webp" },
      regularSeasonChamp: { name: "Craig", teamName: "Sxy Bane", avatar: "/images/owner_pictures/craig.webp" },
      regularSeasonLoser: { name: "Jake", teamName: "Jake's Jokes", avatar: "/images/owner_pictures/jake.webp" },
    },
    {
      year: 2019,
      champion: { name: "Craig", teamName: "Sxy Bane", avatar: "/images/owner_pictures/craig.webp" },
      loser: { name: "Jake", teamName: "Jake's Jokes", avatar: "/images/owner_pictures/jake.webp" },
      regularSeasonChamp: { name: "Andrew", teamName: "Andrew's Avengers", avatar: "/images/owner_pictures/andrew.webp" },
      regularSeasonLoser: { name: "Matt", teamName: "Matt's Mayhem", avatar: "/images/owner_pictures/matt.webp" },
    },
    {
      year: 2018,
      champion: { name: "Andrew", teamName: "Andrew's Avengers", avatar: "/images/owner_pictures/andrew.webp" },
      loser: { name: "Ben", teamName: "Ben's Beasts", avatar: "/images/owner_pictures/ben.webp" },
      regularSeasonChamp: { name: "Taylor", teamName: "Taylor's Tears", avatar: "/images/owner_pictures/taylor.webp" },
      regularSeasonLoser: { name: "Nick", teamName: "Nick's Nightmares", avatar: "/images/owner_pictures/nick.webp" },
    },
    {
      year: 2017,
      champion: { name: "Taylor", teamName: "Taylor's Tears", avatar: "/images/owner_pictures/taylor.webp" },
      loser: { name: "Taylor", teamName: "Taylor's Tears", avatar: "/images/owner_pictures/taylor.webp" },
      regularSeasonChamp: { name: "Ben", teamName: "Ben's Beasts", avatar: "/images/owner_pictures/ben.webp" },
      regularSeasonLoser: { name: "Taylor", teamName: "Taylor's Tears", avatar: "/images/owner_pictures/taylor.webp" },
      note: "Taylor won the championship, regular season, AND both toilet bowls somehow",
    },
  ],
};