import { calculateSavings } from '../'

describe('test calculate savings', () => {
    it('should toggle value between mount and unmount', () => {
      expect(calculateSavings(100, 120)).toBe(20);
      expect(calculateSavings(100, 90)).toBe(0);
    });
  });
  