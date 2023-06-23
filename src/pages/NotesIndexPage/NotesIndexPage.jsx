import { useState, useEffect } from "react";
import { createNote } from '../../utilities/notes-service'
import * as notesAPI from '../../utilities/notes-api'
import Note from '../../components/Note/Note'

export default function NotesIndexPage({user}) {
    const [notes, setNotes] = useState([]);
    const [newNoteText, setNewNoteText] = useState({text: ''});

    async function handleSubmit(event){
        event.preventDefault();
        console.log('this is user in handleAddNote', user);
        const newNote = {
            text: newNoteText.text,
            user: user._id
        };
        const note = await createNote(newNote)
        setNotes([...notes, note]);
        console.log("notes in handleAddNote", notes)
        setNewNoteText({text: ""});
    };

    function handleChange(evt){
        setNewNoteText({...newNoteText, [evt.target.name]: evt.target.value});
    }

    useEffect(() =>{
        async function getItems(){
            const items = await notesAPI.getNotes()
            setNotes(items)
        }
        getItems()
        console.log('this is notes after useEffect', notes)
    }, [])

    const noteItems = notes.map(note => 
        <Note 
            key={note._id}
            note={note}
            user={user}
        />
    )

    return (
        <div>
        <h1>{notes.length === 0 ? "No Notes Yet!" : "Notes"}</h1>

        {/* Add Note form */}
        <form onSubmit={handleSubmit}>
            <textarea
            name='text'
            value={newNoteText.text}
            onChange={handleChange}
            />
            <button type="submit">Add Note</button>
        </form>

        {/* List of Notes */}
        {notes.length === 0 ? (
            <p>No notes yet!</p>
        ) : (
            <ul>
                {noteItems}
            </ul>
        )}
        </div>
    );
}