const csrfController = require('./csrfController');

describe('csrfController', () => {
  it('should be an object', () => {
    expect(typeof csrfController).toBe('object');
  });

  it('should export at least one function', () => {
    const exportedFunctions = Object.values(csrfController).filter(fn => typeof fn === 'function');
    expect(exportedFunctions.length).toBeGreaterThan(0);
  });
});
