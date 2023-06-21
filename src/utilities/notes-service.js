import * as notesApi from './notes-api'

export async function createNote(noteData){
    const note = await notesApi.createNote(noteData)
    return note
}