import { useState } from "react";
import { createNote } from '../../utilities/notes-service'

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
            {notes.map((note, index) => (
                <li key={index}>
                <p>{note.text}</p>
                <p>{note.createdAt.toLocaleString()}</p>
                </li>
            ))}
            </ul>
        )}
        </div>
    );
}