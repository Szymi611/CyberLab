const sqlInjectionController = require('./sqlInjectionController');

describe('sqlInjectionController', () => {
  it('should be an object', () => {
    expect(typeof sqlInjectionController).toBe('object');
  });

  it('should export at least one function', () => {
    const exportedFunctions = Object.values(sqlInjectionController).filter(fn => typeof fn === 'function');
    expect(exportedFunctions.length).toBeGreaterThan(0);
  });
});
