import { useState,useEffect } from "react";
import api from "../api";
import "../styles/home.css"
import Note from "../components/Note"
import { Link } from "react-router-dom";



function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Note deleted!");
                else alert("Failed to delete note.");
                getNotes();
            })
            .catch((error) => alert(error));
    };



    return (
        <div className="container mx-auto px-4 py-8"> 

        <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">My Notes</h2> 
            <div className="flex items-center gap-x-3">
            <Link
                to="/create-notes"
                className="inline-flex items-center justify-between  px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
            >
                Add Note
            </Link>

            <Link
                to="/logout"
                className="inline-flex items-center justify-center px-7 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-150"
            >
                Logout
            </Link>
            </div>
            
        </div>

        {notes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-1">
                {notes.map((note) => (
                    <Note note={note} onDelete={deleteNote} key={note.id} />
                ))}
            </div>
        ) : (
            <div className="text-center py-12">
                <h3 className="mt-2 text-lg font-medium text-gray-700">No notes yet</h3>
                <p className="mt-1 text-sm text-gray-500">
                    Get started by creating a new note.
                </p>
                <div className="mt-6">
                     <Link
                        to="/create-notes" 
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Create Note
                    </Link>
                </div>
            </div>
        )}
    </div>
    );
}

export default Home;