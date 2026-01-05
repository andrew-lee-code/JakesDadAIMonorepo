import {
  ERA_CONFIG,
  PRE_MODERN_ERA_YEARS,
  MODERN_ERA_YEARS,
  HPPR_ERA_YEARS,
  type EraKey,
} from "../constants/years";

/**
 * Converts a set of era selections to an array of years
 */
export function getYearsForEras(selectedEras: Set<EraKey>): number[] {
  const years: number[] = [];
  if (selectedEras.has("pre-modern")) years.push(...PRE_MODERN_ERA_YEARS);
  if (selectedEras.has("modern")) years.push(...MODERN_ERA_YEARS);
  if (selectedEras.has("hppr")) years.push(...HPPR_ERA_YEARS);
  return years;
}

/**
 * Filters records by selected eras
 */
export function filterByEras<T extends { year: number }>(
  records: T[],
  selectedEras: Set<EraKey>
): T[] {
  const years = getYearsForEras(selectedEras);
  return records.filter((r) => years.includes(r.year));
}

/**
 * Gets a formatted string of selected era ranges for display
 */
export function getSelectedEraRanges(selectedEras: Set<EraKey>): string {
  const ranges = Array.from(selectedEras)
    .map((era) => ERA_CONFIG[era].range)
    .sort();
  return ranges.join(", ");
}
