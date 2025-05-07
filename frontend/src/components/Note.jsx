import React from "react";
import "../styles/note.css"

function Note({ note, onDelete }) {
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US")

    return (
        <div className="note-container grid gap-2">
            <p className="note-title text-2xl">{note.title}</p>
            <p className="note-content">{note.content}</p>
            <p className="note-date mt-4 mb-0">{formattedDate}</p>
            <button className="delete-button h-10 w-20 " onClick={() => onDelete(note.id)}>
                Delete
            </button>
        </div>
    );
}

export default Note
