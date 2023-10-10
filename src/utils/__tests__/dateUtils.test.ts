import {dateUtils} from '@utils';
import {add, Duration, formatISO, sub} from 'date-fns';

const MOCKED_NOW = 1696573824333;

function getDateISO(duration: Duration, op?: 'sub' | 'add'): string {
  op = op || 'sub';
  const time =
    op === 'sub' ? sub(Date.now(), duration) : add(Date.now(), duration);
  const timeISO = formatISO(time);

  return dateUtils.formatRelative(timeISO);
}

describe('dateUtils', () => {
  beforeAll(() => {
    jest.spyOn(Date, 'now').mockImplementation(() => MOCKED_NOW);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
  describe('formatRelative', () => {
    test('should be displayed in seconds if less than 1 minute ago', () => {
      expect(getDateISO({seconds: 30})).toBe('30 s');
    });
    test('should be displayed in minutes if less than 1 hour ago', () => {
      expect(getDateISO({minutes: 20})).toBe('20 m');
    });
    test('should be displayed in hours if less than 1 day ago', () => {
      expect(getDateISO({hours: 2})).toBe('2 h');
    });
    test('should be displayed in days if less than 1 week ago', () => {
      expect(getDateISO({days: 6})).toBe('6 d');
    });
    test('should be displayed in weeks if less than 1 month ago', () => {
      expect(getDateISO({weeks: 3})).toBe('3 sem');
    });
    test('should be displayed in months if less than 12 months ago', () => {
      expect(getDateISO({months: 6})).toBe('6 meses');
    });
    test('should be displayed in dd/MM/yyyy if future date', () => {
      expect(getDateISO({days: 2}, 'add')).toBe('08/10/2023');
    });
  });
});
