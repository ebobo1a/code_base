import { validateDate } from './validateDate';
import { errors } from '../utils/dictionarty';

function formatDate(d: Date): string {
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}.${mm}.${yyyy}`;
}

describe('validateDate', () => {
  test('Валидация даты пропускает дату в виде ДД.ММ.ГГГГ', () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const res = validateDate(formatDate(tomorrow));
    expect(res.isValid).toBe(true);
    expect(res.message).toBe(errors.date.valid);
  });

  test('Валидация даты не пропускает спецсимволы', () => {
    const res = validateDate('12.12.2030@');
    expect(res.isValid).toBe(false);
    expect(res.message).toBe(errors.date.invalidCharacters);
  });

  test('Валидация даты не пропускает буквенные значения', () => {
    const res = validateDate('12.ab.2030');
    expect(res.isValid).toBe(false);
    expect(res.message).toBe(errors.date.invalidCharacters);
  });

  test('Валидация даты выдаёт предупреждение, если дата раньше текущей', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const res = validateDate(formatDate(yesterday));
    expect(res.isValid).toBe(false);
    expect(res.message).toBe(errors.date.past);
  });

  test('Валидация даты не пропускает дату выезда раньше даты заезда', () => {
  const checkIn = new Date();
  checkIn.setDate(checkIn.getDate() + 10);

  const checkOut = new Date();
  checkOut.setDate(checkOut.getDate() + 5);

  const res = validateDate(formatDate(checkOut), { minDate: formatDate(checkIn) });
  expect(res.isValid).toBe(false);
  expect(res.message).toBe(errors.date.beforeCheckIn);
});

});
