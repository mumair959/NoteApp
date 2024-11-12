import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addNote = createAsyncThunk("notes/addNote", async(payload)=>{
    const response = await axios.post("http://127.0.0.1:8000/api/notes",payload, {
        headers: {
            'Content-Type': 'application/json',
            'Accept' : 'application/json'
        }
    });
    return response.data;
});

export const getNotes = createAsyncThunk("notes/getNotes", async (url = null) => {
    if (url == null) {
        url = 'http://127.0.0.1:8000/api/notes';
    }
    const response = await axios.get(url);
    return response.data;   
});

export const fetchNoteById =  createAsyncThunk("notes/getNote", async (id)=> {
    const response = await axios.get('http://127.0.0.1:8000/api/notes',id)
    return response.data; 
});

export const updateNote = createAsyncThunk('notes/updateNote', async (payload) => {
    const { id, ...noteData } = payload;

    // Create FormData object
    const formData = new FormData();
    formData.append('title', noteData.title);
    formData.append('content', noteData.content);

    const response = await axios.put(`http://127.0.0.1:8000/api/notes/${id}`, formData, {
        headers: {
            'Content-Type': 'application/json',
            'Accept' : 'application/json'
        }
    });

    return response.data;
});


export const deleteNote = createAsyncThunk("notes/deleteNote", async(id) => {
    const response =await axios.delete(`http://127.0.0.1:8000/api/notes/${id}`);
    return response.data; 
});

const initialState = {
    status: '',
    notes: [],
    error: '',
  };

export const notesSlice = createSlice({
    name : "notes",
    initialState,
    reducers :{},
    extraReducers: (builder) => {
        builder
        .addCase(getNotes.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(getNotes.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.notes = action.payload.data
            state.error = ''
        })
        .addCase(getNotes.rejected, (state, action) => {
            state.status = 'failed';
            state.notes = []
            state.error = action.error.message
        })
        .addCase(fetchNoteById.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchNoteById.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.notes = action.payload.data
            state.error = ''
        })
        .addCase(fetchNoteById.rejected, (state, action) => {
            state.status = 'failed';
            state.notes = []
            state.error = action.error.message
        })
        .addCase(updateNote.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(updateNote.fulfilled, (state, action) => {
            console.log(action.payload.data);
            state.status = 'succeeded';
            const updatedNote = action.payload.data;
            const index = state.notes.data.findIndex(notes => notes.id === updatedNote.id);
            if (index !== -1) {
                state.notes[index] = updatedNote;
            }
            state.error = '';
          })
          .addCase(updateNote.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          })
        .addCase(deleteNote.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(deleteNote.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.notes = state.notes.data.filter(notes => notes.id !== action.payload.id);
            state.error = '';
        })
        .addCase(deleteNote.rejected, (state, action) => {
            state.status = 'failed';
            state.notes = []
            state.error = action.error.message
        });
    },
    
});


export default notesSlice.reducer;