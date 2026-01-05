/**
 * League era definitions for filtering data
 */

// Pre-Modern Era: 2012-2015 (4 years)
export const PRE_MODERN_ERA_YEARS = [2015, 2014, 2013, 2012];

// Modern Era: 2016-2021 (6 years)
export const MODERN_ERA_YEARS = [2021, 2020, 2019, 2018, 2017, 2016];

// HPPR Era: 2022-2025 (4 years)
export const HPPR_ERA_YEARS = [2025, 2024, 2023, 2022];

// All years combined
export const ALL_YEARS = [
  ...HPPR_ERA_YEARS,
  ...MODERN_ERA_YEARS,
  ...PRE_MODERN_ERA_YEARS,
];

// Era configuration for UI
export const ERA_CONFIG = {
  "pre-modern": {
    label: "Pre-Modern",
    years: PRE_MODERN_ERA_YEARS,
    range: "2012-2015",
  },
  modern: {
    label: "Modern",
    years: MODERN_ERA_YEARS,
    range: "2016-2021",
  },
  hppr: {
    label: "HPPR",
    years: HPPR_ERA_YEARS,
    range: "2022-2025",
  },
} as const;

export type EraKey = keyof typeof ERA_CONFIG;
