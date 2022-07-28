import { getPositionClassName } from './getPositionClassName';

describe('getPositionClassName', () => {
  it('should return the correct class name with given position', () => {
    expect(getPositionClassName('top-left')).toBe('top-4 left-4');
    expect(getPositionClassName('top-right')).toBe('top-4 right-4');
    expect(getPositionClassName('bottom-left')).toBe('bottom-4 left-4');
    expect(getPositionClassName('bottom-right')).toBe('bottom-4 right-4');
  });

  it('should return the correct class name with no position', () => {
    expect(getPositionClassName()).toBe('bottom-4 right-4');
  });
});
