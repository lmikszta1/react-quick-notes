export default function Note({note}){

    return (
        <li>
            <div>{note.text}</div>
            <div>Added on: {note.createdAt.toLocaleString()}</div>
        </li>
    )
}