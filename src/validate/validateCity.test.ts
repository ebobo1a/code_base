import { validateCityName } from './validateCity';
import { errors } from '../utils/dictionarty';

describe('validateCityName', () => {
  test('Валидация города выдаёт предупреждение, если есть экранирование', () => {
    const res = validateCityName('Moscow<script>');
    expect(res.isValid).toBe(false);
    expect(res.message).toBe(errors.city.escape);
  });

  test('Валидация города пропускает название с восклицательным знаком или дефисами', () => {
    const res = validateCityName('Saint-Louis-du-Ha! Ha!');
    expect(res.isValid).toBe(true);
    expect(res.message).toBe(errors.city.valid);
  });

  test('Валидация города пропускает название со спецсимволами (например, Ağrı)', () => {
    const res = validateCityName('Ağrı');
    expect(res.isValid).toBe(true);
    expect(res.message).toBe(errors.city.valid);
  });

  test('Валидация города пропускает название из одной буквы', () => {
    const res = validateCityName('A');
    expect(res.isValid).toBe(true);
    expect(res.message).toBe(errors.city.valid);
  });
});
