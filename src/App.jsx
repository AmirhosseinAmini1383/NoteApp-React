import { useReducer, useState } from "react";
import "./App.css";
import AddNewNote from "./components/AddNewNote";
import NoteList from "./components/NoteList";
import NoteStatus from "./components/NoteStatus";
import NoteHeader from "./components/NoteHeader";

const initialState = [];
function notesReducer(state, { type, payload }) {
  switch (type) {
    case "ADD_NOTE": {
      return [...state, payload];
    }
    case "DELETE_NOTE": {
      return state.filter((n) => n.id !== payload);
    }
    case "COMPLETE_NOTE": {
      return state.map((note) =>
        note.id === payload ? { ...note, completed: !note.completed } : note
      );
    }
    default:
      throw new Error("unknown Action " + type);
  }
}
function App() {
  // const [notes, setNotes] = useState([]);
  const [sortBy, setSortBy] = useState("latest");
  const [notes, dispatch] = useReducer(notesReducer, initialState);

  const handleAddNotes = (newNote) => {
    dispatch({ type: "ADD_NOTE", payload: newNote });
  };
  const handleDeleteNote = (id) => {
    dispatch({ type: "DELETE_NOTE", payload: id });
  };
  const handleCompleteNote = (e) => {
    const noteId = +e.target.value;
    dispatch({ type: "COMPLETE_NOTE", payload: noteId });
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
