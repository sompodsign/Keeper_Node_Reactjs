import React, {useEffect, useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "./axios"


function App() {

    // notes array set to set with empty initial
    const [notes, setNotes] = useState([]);
    // setting remove item in state to track changes.

    const [removeItem, setRemoveItem] = useState("");

    // fetch data from server asynchronously
    useEffect(() => {
        axios.get("http://localhost:4000/api/notes")
            .then(res => {
                setNotes(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    //add a note and spread it with previous notes.
    function addNote(newNote) {
        setNotes(prevNotes => {
            return [...prevNotes, newNote];
        });
    }

    // Delete function for an item with title.
    async function deleteNote(title) {
        setRemoveItem(title)
        setNotes(() => {
            return notes.filter(el => {
                return el.title !== title;
            })
        })
        await axios.delete("http://localhost:4000/api/delete", {data: {item: title}});

    }

    //Delete specific item with title.
    useEffect(() => {
        deleteNote(removeItem);
    }, [removeItem]) // eslint-disable-line react-hooks/exhaustive-deps

console.log(notes)
    console.log(removeItem)
    return (
        <div>
            <Header/>
            <CreateArea onAdd={addNote}/>
            {notes.map((noteItem, index) => {
                return (
                    <Note
                        key={index}
                        id={noteItem.title}
                        title={noteItem.title}
                        content={noteItem.content}
                        onDelete={deleteNote}
                    />
                );
            })}
            <Footer/>
        </div>
    );
}

export default App;
