import { addNewEmptyNote, clearNotesLogout, deleteNoteById, journalSlice, noteUpdated, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving } from "../../../src/store/journal/journalSlice"
import { demoEmptyNote, demoNote, demoNotes, demoState, initialState } from "../../fixtures/journalFixtures";

describe('Pruebas en el journalSlice', () => {

    test('debe regresar el estado inicial y llamarse "journal"', () => {

        expect(journalSlice.name).toBe('journal');

        const state = journalSlice.reducer(initialState, {});
        expect(state).toEqual(initialState)
    });

    test('debe poner el isSaving en true', () => {

        const state = journalSlice.reducer(initialState, savingNewNote());

        expect(state).toEqual({ ...initialState, isSaving: true })
    });

    test('debe añadir una nota vacía en notes[]', () => {

        const state = journalSlice.reducer({...initialState, isSaving: true}, addNewEmptyNote(demoEmptyNote));

        expect(state).toEqual({ ...initialState, notes: [demoEmptyNote] })
    });

    test('debe setear la nota en state.active', () => {

        const state = journalSlice.reducer(initialState, setActiveNote(demoNote));

        expect(state).toEqual({ ...initialState, active: demoNote });
    });

    test('debe setear las notas en notes[]', () => {

        const state = journalSlice.reducer(initialState, setNotes(demoNotes));

        expect(state).toEqual({ ...initialState, notes: demoNotes })
    });

    test('debe poner el isSaving en true y limpiar savedMessage', () => {

        const state = journalSlice.reducer({ ...initialState, savedMessage: 'Hola mundo' }, setSaving());

        expect(state).toEqual({ ...initialState, isSaving: true })
    });

    test('debe actualizar la nota correcta y setear el savedMessage', () => {

        const updatedNote = {
            id: 'ABCD1234',
            title: 'Este es el titulo actualizado',
            body: 'Este es un nuevo body'
        }

        const state = journalSlice.reducer({ ...initialState, notes: demoNotes, isSaving: true }, noteUpdated(updatedNote));

        expect(state).toEqual({...initialState, notes: [demoNote, updatedNote], savedMessage: 'Nota actualizada correctamente'});
    });

    test('debe setear la demoImage en active.imageUrls', () => {

        const demoImage = ["https://image.png"]

        const state = journalSlice.reducer({...initialState, active: {...demoNote, imageUrls: [],}, isSaving: true}, setPhotosToActiveNote(demoImage));

        expect(state).toEqual({...initialState, active: {...demoNote, imageUrls: demoImage}})
        
    });

    test('debe regresar al initialState', () => {

        const state = journalSlice.reducer(demoState, clearNotesLogout());

        expect(state).toEqual(initialState);
    });

    test('debe borrar la nota correcta, poner el active en null y el isSaving en false', () => {
        const noteId = 'ABCD1234';

        const state = journalSlice.reducer({...demoState, savedMessage: ''}, deleteNoteById(noteId));

        expect(state).toEqual({...initialState, notes: [demoNote]});


    });
})