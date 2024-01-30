import { getCookie } from '../app/util/util';

describe('getCookie', () => {
  beforeEach(() => {
    // Set up document.cookie with some test values
    document.cookie = 'key1=value1';
    document.cookie = 'key2=value2';
    document.cookie = 'key3=value3';
  });

  afterEach(() => {
    // Clear document.cookie after each test
    document.cookie = '';
  });

  test('returns the value of an existing cookie', () => {
    const key = 'key1';
    const expectedValue = 'value1';

    const result = getCookie(key);

    expect(result).toBe(expectedValue);
  });

  test('returns an empty string for a non-existing cookie', () => {
    const key = 'nonExistingKey';

    const result = getCookie(key);

    expect(result).toBe('');
  });

  test('returns an empty string for an empty cookie value', () => {
    const key = 'key2';

    const result = getCookie(key);

    expect(result).toBe('');
  });

  test('returns the correct value for a cookie with special characters', () => {
    const key = 'key3';
    const expectedValue = 'value3';

    const result = getCookie(key);

    expect(result).toBe(expectedValue);
  });
});