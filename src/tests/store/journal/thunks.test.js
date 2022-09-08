
import {
  startNewNote,
  startLoadingNotes,
  startSaveNote,
  startUploadingFiles,
  startDeletingNote
} from './../../../store/journal/thunks';

describe('Journal thunks scenarios::::', () => {

  const dispatch = jest.fn();
  const getState = jest.fn();
  beforeEach(() => jest.clearAllMocks());

  it('Should startNewNote and create a note SUCCESSFULY', async () => {
    await startNewNote()(dispatch, getState);
  });
 })