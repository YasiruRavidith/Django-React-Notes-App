import { useState,useEffect, use } from "react";
import api from "../api";
import "../styles/home.css"
import { Link, Navigate, useNavigate } from "react-router-dom";


function CreateNotes() {
    const navigate = useNavigate();
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    

    const createNote = (e) => {
        e.preventDefault();
        api
            .post("/api/notes/", { content, title })
            .then((res) => {
                if (res.status === 201) {
                    alert("Note created!");
                    navigate("/")
                }
                else alert("Failed to make note.");
               
            })
            .catch((err) => alert(err));
    };

    return (
        <div className="flex flex-col justify-center items-center mb-8">
            <div>
            <h2 className="text-2xl font-bold mb-10 mt-4">Create a Note</h2>
                
            </div>
            
            <form onSubmit={createNote}>
                <label htmlFor="title">Title:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor="content">Content:</label>
                <br />
                <textarea
                    id="content"
                    name="content"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <br />
                <input type="submit" value="Submit"></input>
                <Link
                to="/"
                className="inline-flex items-center justify-center w-full h-11 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-150">
                Back to My Notes
                </Link>
        
            </form>
        </div>
    );
}

export default CreateNotes;