import { useState } from "react";
import "./App.css";
import AddNewNote from "./components/AddNewNote";
import NoteList from "./components/NoteList";
import NoteStatus from "./components/NoteStatus";
import NoteHeader from "./components/NoteHeader";
import { NotesProvider } from "./context/NotesContext";

function App() {
  const [sortBy, setSortBy] = useState("latest");

  return (
    <NotesProvider>
      <div className="container">
        <NoteHeader sortBy={sortBy} onSort={(e) => setSortBy(e.target.value)} />
        <div className="note-app">
          <AddNewNote />
          <div className="note-container">
            <NoteStatus />
            <NoteList sortBy={sortBy} />
          </div>
        </div>
      </div>
    </NotesProvider>
  );
}

export default App;

// const handleAddNotes = (newNote) => {
//   dispatch({ type: "ADD_NOTE", payload: newNote });
// };
// const handleDeleteNote = (id) => {
//   dispatch({ type: "DELETE_NOTE", payload: id });
// };
// const handleCompleteNote = (e) => {
//   const noteId = +e.target.value;
//   dispatch({ type: "COMPLETE_NOTE", payload: noteId });
// };
