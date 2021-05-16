import { calculateSavings } from '../'

describe('test calculate savings', () => {
    it('should return correct percentage', () => {
      expect(calculateSavings(100, 120)).toBe(20);
      expect(calculateSavings(100, 90)).toBe(0);
      expect(calculateSavings(100, 120.1111)).toBe(20.11);
    });
  });
  