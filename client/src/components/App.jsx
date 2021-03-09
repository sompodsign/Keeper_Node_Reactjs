import React, {useEffect, useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "./axios"


function App() {

    // const [data, setData] = useState({firstName: 'shedrack', lastName: 'akintayo'});

    useEffect(()=>{
        async function getData(){
            const res = await axios.get("http://localhost:4000/api/")
            console.log(res)
        }
        getData();
    })


    axios.post('http://localhost:4000/api', {
        foo: 'bar'
    })

  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

    function deleteNote(id) {
      setNotes(prevNotes => {
        return prevNotes.filter((noteItem, index) => {
          return index !== id;
        });
      });
    }

    return (
        <div>
          <Header/>
          <CreateArea onAdd={addNote}/>
          {notes.map((noteItem, index) => {
            return (
                <Note
                    key={index}
                    id={index}
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
