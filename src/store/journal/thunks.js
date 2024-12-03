import { doc, collection, setDoc, deleteDoc } from 'firebase/firestore/lite'
import { FirebaseDB } from '../../firebase/config';
import { addNewEmptyNote, setActiveNote, savingNewNote, setNotes, setSaving, noteUpdated, setPhotosToActiveNote, deleteNoteById } from './journalSlice';
import { loadNotes } from '../../helpers/loadNotes';
import { fileUpload } from '../../helpers/fileUpload';


export const startNewNote = () => {
    return async (dispatch, getState) => {

        dispatch(savingNewNote())

        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
        await setDoc(newDoc, newNote)

        newNote.id = newDoc.id

        dispatch(addNewEmptyNote(newNote))
        dispatch(setActiveNote(newNote))

    }
}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        if (!uid) throw new Error('No se recibio el uid del usuario')

        const notes = await loadNotes(uid);

        dispatch(setNotes(notes))
    }
}

export const startSavingNotes = () => {
    return async (dispatch, getState) => {

        dispatch(setSaving())

        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const noteToFireStore = { ...note };
        delete noteToFireStore.id;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await setDoc(docRef, noteToFireStore, { merge: true });

        dispatch(noteUpdated(note))
    }
}

export const startUploadingFiles = (files = []) => {
    return async (dispatch) => {
        dispatch(setSaving());

        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file))
        }

        const photosUrls = await Promise.all(fileUploadPromises);

        dispatch(setPhotosToActiveNote(photosUrls));

    }
}

export const startDeletingNote = () => {
    return async (dispatch, getState) => {

        dispatch(savingNewNote())

        const {uid} = getState().auth;
        const {active:note} = getState().journal;

        const docRef = doc( FirebaseDB, `${uid}/journal/notes/${note.id}` );
        await deleteDoc(docRef);
        
        dispatch( deleteNoteById(note.id) )
    }
}