export const errors = {
  city: {
    required: 'City name is required.',
    invalid: 'City name contains invalid characters.',
    empty: 'City name cannot be an empty.',
    escape: 'City name contains characters that need to be escaped.',
    valid: 'City name is valid.',
  },
  date: {
    required: 'Date is required.',
    invalidCharacters: 'Date contains invalid characters.',
    invalid: 'Date is invalid.',
    pattern: 'Date must be in the format DD.MM.YYYY.',
    past: 'Date cannot be in the past.',
    valid: 'Date is valid.',
    beforeCheckIn: 'Дата выезда не может быть раньше даты заезда',
  },
};
