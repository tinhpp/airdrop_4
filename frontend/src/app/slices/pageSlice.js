import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const pageSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {
    setPages: (state, action) => {
      state = action.payload;
      return state;
    },
    togglePage: (state, action) => {
      const pageId = action.payload;
      state[pageId].isOpen = !state[pageId].isOpen;
      return state;
    },
    setNoteList: (state, action) => {
      const { page, note } = action.payload;
      state[page].notes = note;
      return state;
    },
    addPage: (state, action) => {
      return {...state, ...action.payload}
    },
    removePage: (state, action) => {
      delete state[action.payload];
      return state;
    },
    editPage: (state, action) => {
      const newPage = action.payload;
      state[newPage._id] = {...state[newPage._id],...newPage};
      return state;
    },
    addNote: (state, action) => {
      const note = action.payload;
      if(!state[note.page].notes) state[note.page].notes = [];
      state[note.page].notes.push(note);
      state[note.page].isOpen = true;
      return state;
    },
    editNote: (state, action) => {
      const newNote = action.payload;
      state[newNote.page].notes = state[newNote.page].notes.map(item => item.slug == newNote.slug ? {...item,...newNote} : item);
      return state;
    },
    removeNote: (state, action) => {
      const note = action.payload;
      state[note.page].notes = state[note.page].notes.filter(item => item.slug != note.slug);
      return state;
    },
    reset: (state, action) => {
      return initialState;
    }
  },
});

export const { setPages, togglePage, setNoteList, addNote, editNote, removeNote, addPage, removePage, editPage, reset } = pageSlice.actions;
export default pageSlice.reducer;
