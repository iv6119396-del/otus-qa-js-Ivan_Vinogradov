import { nameIsValid } from '../../../src/app';
import { fullTrim } from '../../../src/app';
import { getTotal } from '../../../src/app';

// Тесты для nameIsValid
describe('nameIsValid', () => {
  test('возвращает true для корректного имени (строка из букв длиной > 2)', () => {
    //Arrange
    const name_1 = 'Yana';

    //Act
    const result_1 = nameIsValid(name_1);

    //Assert
    expect(result_1).toBe(true);
  });

  test('возвращает false для имени короче 2 символов', () => {
    //Arrange
    const name_2 = 'a';

    //Act
    const result_2 = nameIsValid(name_2);

    //Assert
    expect(result_2).toBe(false);
  });

  test('возвращает false, если имя содержит не только строчные латинские буквы', () => {
    //Arrange
    const name_3 = 'Yana123';

    //Act
    const result_3 = nameIsValid(name_3);

    //Assert
    expect(result_3).toBe(false);
  });
});

// Параметризованные тесты для fullTrim
describe('fullTrim', () => {
  const testCases = [
    { input: '  hello world  ', expected: 'helloworld' },
    { input: 'a b c', expected: 'abc' },
    { input: '   ', expected: '' },
    { input: null, expected: '' },
    { input: undefined, expected: '' }
  ];

  testCases.forEach(({ input, expected }) => {
    test(`удаляет все пробелы из "${input}", возвращает "${expected}"`, () => {
      expect(fullTrim(input)).toBe(expected);
    });
  });
});

// Тесты для getTotal
describe('getTotal', () => {
  test('корректно считает сумму без скидки', () => {
    //Arrange
    const price_1 = 10;
    const quantity_1 = 5;

    //Act
    const summ_1 = getTotal(price_1, quantity_1);

    //Assert
    expect(summ_1).toBe(50);
  });

  test('применяет скидку и возвращает правильную сумму', () => {
    //Arrange
    const price_2 = 100;
    const quantity_2 = 2;

    //Act
    const summ_2 = getTotal(price_2, quantity_2, 10);

    //Assert
    expect(summ_2).toBe(180);
  });

  test('применяет скидку и возвращает правильную сумму', () => {
    //Arrange
    const price_3 = 10;
    const quantity_3 = 5;

    //Act
    const summ_3 = getTotal(price_3, quantity_3, '10');

    //Assert
    expect(summ_3).toThrow('Скидка должна быть числом');
  });
});
