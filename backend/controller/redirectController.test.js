const redirectController = require('./redirectController');

describe('redirectController', () => {
  it('should be an object', () => {
    expect(typeof redirectController).toBe('object');
  });

  it('should export at least one function', () => {
    const exportedFunctions = Object.values(redirectController).filter(fn => typeof fn === 'function');
    expect(exportedFunctions.length).toBeGreaterThan(0);
  });
});
