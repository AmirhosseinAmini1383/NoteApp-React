import { useState } from "react";
import "./App.css";
import AddNewNote from "./components/AddNewNote";
import NoteList from "./components/NoteList";
function App() {
  const [notes, setNotes] = useState([]);
  const handleAddNotes = (newNote) => {
    setNotes((prevNote) => [...prevNote, newNote]);
  };
  const handleDeleteNote = (id) => {
    // const filteredNotes = notes.filter((n) => n.id !== id);
    // setNotes(filteredNotes);
    setNotes((prevNotes) => prevNotes.filter((n) => n.id !== id));
  };
  const handleCompleteNote = (e) => {
    const noteId = +e.target.value;
    // const newNotes = notes.map((note) =>
    //   note.id === noteId ? { ...note, complete: !note.complete } : note
    // );
    // setNotes(newNotes);
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId ? { ...note, completed: !note.completed } : note
      )
    );
  };
  return (
    <div className="container">
      <div className="note-header">note header</div>
      <div className="note-app">
        <AddNewNote onAddNote={handleAddNotes} />
        <div className="note-container">
          <NoteList
            onDeleteNote={handleDeleteNote}
            onComplete={handleCompleteNote}
            notes={notes}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
