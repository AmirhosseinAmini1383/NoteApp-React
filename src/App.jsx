import { useState } from "react";
import "./App.css";
import AddNewNote from "./components/AddNewNote";
import NoteList from "./components/NoteList";
import NoteStatus from "./components/NoteStatus";
import NoteHeader from "./components/NoteHeader";
function App() {
  const [notes, setNotes] = useState([]);
  const [sortBy, setSortBy] = useState("latest");

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
    //   note.id === noteId ? { ...note, completed: !note.completed } : note
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
      <NoteHeader
        notes={notes}
        sortBy={sortBy}
        onSort={(e) => setSortBy(e.target.value)}
      />
      <div className="note-app">
        <AddNewNote onAddNote={handleAddNotes} />
        <div className="note-container">
          <NoteStatus notes={notes} />
          <NoteList
            onDeleteNote={handleDeleteNote}
            onComplete={handleCompleteNote}
            notes={notes}
            sortBy={sortBy}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
