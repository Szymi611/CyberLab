const xssController = require('./xssController');

describe('xssController', () => {
  it('should be an object', () => {
    expect(typeof xssController).toBe('object');
  });

  it('should export at least one function', () => {
    const exportedFunctions = Object.values(xssController).filter(fn => typeof fn === 'function');
    expect(exportedFunctions.length).toBeGreaterThan(0);
  });
});
