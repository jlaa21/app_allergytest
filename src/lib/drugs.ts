import data from './drugs.json';

// Represents the structure of a single drug from the JSON file
export type Drug = {
  'Nombre medicamento': string;
  'Intraepidérmica (prick)': string;
  'Intradérmica': string;
};

// Represents the parsed concentration details for calculation
export type Concentration = {
  value: number;
  unit: string;
};

export const drugs: Drug[] = data.drugs;

/**
 * Parses a concentration string (e.g., "100 mg/mL", "undiluted", "--") into a structured object.
 * All units are standardized to mg/mL.
 * @param concentrationStr The string to parse.
 * @param stockConcentration The stock concentration to use if the string is "undiluted".
 * @returns A Concentration object or null if not applicable.
 */
export function parseConcentration(
  concentrationStr: string,
  stockConcentration: Concentration | null = null
): Concentration | null {
  if (!concentrationStr) return null;
  
  concentrationStr = concentrationStr.trim();

  if (concentrationStr === '--' || concentrationStr === '–' || concentrationStr === '') {
    return null; // Not applicable
  }
  
  if (concentrationStr.toLowerCase() === 'tc') {
    return null; // Test Cutaneo is not directly calculable.
  }

  if (concentrationStr.toLowerCase().startsWith('undiluted =')) {
    const newStr = concentrationStr.substring('undiluted ='.length).trim();
    return parseConcentration(newStr, null);
  }

  if (concentrationStr.toLowerCase() === 'undiluted') {
    if (stockConcentration === null || stockConcentration.value === 0) return null;
    return stockConcentration;
  }

  if (concentrationStr.includes('equivalent to')) {
      const match = concentrationStr.match(/equivalent to ([\d,.]+) ([\w/µ]+)/);
      if (match) {
          let value = parseFloat(match[1].replace(',', '.'));
          const unit = match[2];
          if (unit.startsWith('µg') || unit === 'ug' || unit === 'mcg') {
            value /= 1000;
          }
          return { value, unit: 'mg/mL' };
      }
  }

  const match = concentrationStr.match(/([\d,.-]+)\s*([\w/µ]+)/);
  if (match) {
    const valueStr = match[1].split('-')[0];
    let value = parseFloat(valueStr.replace(',', '.'));
    let unit = match[2];

    if (unit.startsWith('µg') || unit === 'ug' || unit === 'mcg' || unit === 'UI') {
      value /= 1000; // Convert µg or UI to mg
    }
    
    if (!isNaN(value)) {
      return { value, unit: 'mg/mL' };
    }
  }

  return null;
}
