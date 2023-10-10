import {stringUtils} from '@utils';

describe('stringUtils', () => {
  describe('capitalizeFirstLetter', () => {
    it('should capitalize the first letter of each word', () => {
      expect(stringUtils.capitalizeFirstLetter('Maria julia')).toBe(
        'Maria Julia',
      );
      expect(stringUtils.capitalizeFirstLetter('MARIA JULIA')).toBe(
        'Maria Julia',
      );
      expect(stringUtils.capitalizeFirstLetter('mArIa')).toBe('Maria');
      expect(stringUtils.capitalizeFirstLetter('maria julia')).toBe(
        'Maria Julia',
      );
    });

    it('should remove leading/trailing spaces', () => {
      expect(stringUtils.capitalizeFirstLetter(' Maria julia')).toBe(
        'Maria Julia',
      );
      expect(stringUtils.capitalizeFirstLetter('MARIA JULIA  ')).toBe(
        'Maria Julia',
      );
    });
  });
});
