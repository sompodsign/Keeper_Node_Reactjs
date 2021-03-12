import React, {useEffect, useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "./axios"


function App() {

    const [notes, setNotes] = useState([]);
    const [removeItem, setRemoveItem] = useState("");

    useEffect(() => {
        axios.get("http://localhost:4000/api/notes")
            .then(res => {
                setNotes(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    function addNote(newNote) {
        setNotes(prevNotes => {
            return [...prevNotes, newNote];
        });
    }

    async function deleteNote(title) {
        setRemoveItem(title)
        setNotes(() => {
            return notes.filter(el => {
                return el.title !== title;
            })
        })
        await axios.delete("http://localhost:4000/api/delete", {data: {item: title}});
    }

    useEffect(() => {
        deleteNote(removeItem);
    }, [removeItem])


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
