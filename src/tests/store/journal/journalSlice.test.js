import { journalDataState, initialJournalState } from '../../fixtures/journalFixture';
import { addNewEmptyNote, journalSlice, savingNewNote, setActiveNote } from './../../../store/journal/journalSlice';


describe('journalSlice scenarios:::::', () => {

  beforeAll(() => {
    jest.clearAllMocks();
  })
  it('should load initialState for journal', () => {
    const state = journalSlice.reducer(initialJournalState, {});
    expect(journalSlice.name).toBe('journal');
    expect( state ).toEqual(initialJournalState);
  });

  it('should make savingNewNote succesfully', () => {
    const state = journalSlice.reducer(journalDataState, savingNewNote(journalDataState));
    expect(state.isSaving).toBeTruthy();
  });

  it('should make addNewEmptyNote successfully', () => {
    const state = journalSlice.reducer(initialJournalState, addNewEmptyNote(initialJournalState, { type: "journal/addNewEmptyNote",payload: {
      title: 'NOTA DEL USUARIO PARA TESTS 2',
      body: 'CONTENIDO TEST 2',
      date: 1662670247655,
  } }));
    expect(state.isSaving).toBeFalsy();
    expect(state.notes.length).toBe(1);
  });

  it('should make setActiveNote successfully', () => {
    const state = journalSlice.reducer(journalDataState, setActiveNote(journalDataState,
      { type: "journal/setActiveNote",payload: {
        id: 'RmHUgJ4uVRJUvsteiv8Q',
        title: 'NOTA DEL USUARIO PARA TESTS',
        body: 'CONTENIDO TEST',
        date: 1662670247631
    }}));
    expect(state.messageSaved).toBe("");
    expect(state.active).toBeDefined();
  });
});
