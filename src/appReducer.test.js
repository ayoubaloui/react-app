// appReducer.test.js
import appReducer from './appReducer';

describe('appReducer', () => {
  it('should handle SET_COUNTRIES action', () => {
    const action = { type: 'SET_COUNTRIES', payload: [{ country: 'Country1' }, { country: 'Country2' }] };
    const newState = appReducer(undefined, action);
    expect(newState.countries).toEqual([{ country: 'Country1' }, { country: 'Country2' }]);
  });

  // Ajoutez des tests similaires pour les autres actions (SET_SINGLE_COUNTRY, SET_CITIES, SET_SINGLE_CITY, SET_SUBMIT, etc.)
});
