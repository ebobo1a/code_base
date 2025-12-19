import { errors } from '../utils/dictionarty';

type ValidateDateOptions = {
  
  minDate?: string;
};

function startOfDay(d: Date) {
  const copy = new Date(d);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function parseDDMMYYYY(dateString: string): { date: Date; isPatternOk: boolean } | null {
  const datePattern = /^\d{2}\.\d{2}\.\d{4}$/;
  const isPatternOk = datePattern.test(dateString);
  if (!isPatternOk) return { date: new Date('Invalid'), isPatternOk };

  const [day, month, year] = dateString.split('.').map(Number);
  const d = new Date(year, month - 1, day);

  
  if (d.getDate() !== day || d.getMonth() !== month - 1 || d.getFullYear() !== year) {
    return { date: new Date('Invalid'), isPatternOk: true };
  }

  return { date: startOfDay(d), isPatternOk: true };
}

export function validateDate(
  dateString: string,
  options: ValidateDateOptions = {},
): {
  isValid: boolean;
  message: string;
} {
  if (!dateString || typeof dateString !== 'string') {
    return {
      isValid: false,
      message: errors.date.required,
    };
  }

  const invalidCharsPattern = /[a-zA-Z<>@!#$%^&*()_+={}[\]:;"'|\\?/~`]/;
  if (invalidCharsPattern.test(dateString)) {
    return {
      isValid: false,
      message: errors.date.invalidCharacters,
    };
  }

  const parsed = parseDDMMYYYY(dateString);

  
  if (!parsed || parsed.isPatternOk === false) {
    return {
      isValid: false,
      message: errors.date.pattern,
    };
  }

  const inputDate = parsed.date;

  
  if (Number.isNaN(inputDate.getTime())) {
    return {
      isValid: false,
      message: errors.date.invalid,
    };
  }

  const today = startOfDay(new Date());

  if (inputDate < today) {
    return {
      isValid: false,
      message: errors.date.past,
    };
  }

  
  if (options.minDate) {
    
    const parsedMin = parseDDMMYYYY(options.minDate);

    if (parsedMin && parsedMin.isPatternOk) {
      const minDate = parsedMin.date;
      if (!Number.isNaN(minDate.getTime()) && inputDate < minDate) {
        return {
          isValid: false,
          message: errors.date.beforeCheckIn,
        };
      }
    }
  }

  return {
    isValid: true,
    message: errors.date.valid,
  };
}
