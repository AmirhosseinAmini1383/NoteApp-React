import { createContext, useContext, useEffect, useReducer } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const NotesContext = createContext(null);
const NotesDispatchContext = createContext(null);

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

export function NotesProvider({ children }) {
  const [notes, setNotes] = useLocalStorage("NOTES", initialState);
  const [state, dispatch] = useReducer(notesReducer, notes);
  useEffect(() => {
    setNotes(state);
  }, [state, setNotes]);
  return (
    <NotesContext.Provider value={state}>
      <NotesDispatchContext.Provider value={dispatch}>
        {children}
      </NotesDispatchContext.Provider>
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error("NotesContext was used outside of NotesProvider");
  }
  return context;
}

export function useNotesDispatch() {
  const context = useContext(NotesDispatchContext);
  if (context === undefined) {
    throw new Error(
      "NotesDispatchContext was used outside of NotesDispatchContext"
    );
  }
  return context;
}
