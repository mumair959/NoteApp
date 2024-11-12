import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchNoteById, updateNote } from "../noteSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';

const EditNote = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [titleError, setTitleError] = useState('');
    const [contentError, setContentError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const note = useSelector(state => state.note.notes.data.find(note => note.id === parseInt(id)));

    
    useEffect(() => {
        dispatch(fetchNoteById(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (note) {
            console.log(note);
            setTitle(note.title);
            setContent(note.content);
        }
    }, [id, note]);

    const validateForm = () => {
        let isValid = true;

        if (!title.trim()) {
            setTitleError('Title is required');
            isValid = false;
        } else {
            setTitleError('');
        }

        if (!content.trim()) {
            setContentError('Content is required');
            isValid = false;
        } else {
            setContentError('');
        }

        return isValid;
    };

    const handleUpdateNote = async() => {
        if (validateForm()) {
            try {
                const updatedNote = {
                    id: id,
                    title: title,
                    content: content
                };
                const response = await dispatch(updateNote(updatedNote));
                console.log(response.payload);
                if (response.payload.success == true) {
                    toast.success(response.payload.message);
                    navigate('/');
                } else {
                    toast.error("Failed to update note. Please try again later.");
                }
            } catch (error) {
                toast.error("An error occurred while updating the note. Please try again later.");
                console.error("Failed to update note:", error);
            }
        }
    }

    if (!note) {
        return <div>Loading...</div>;
    }
    return (
        <div className="App container d-flex justify-content-center align-items-center">
            <div className='card p-4 mt-5 w-100'>
                <h3 className='my-4 text-center'>Edit Post</h3>
                <div className='mb-4'>
                    <input type='text' value={title} onChange={e => setTitle(e.target.value)} className='form-control mb-3' placeholder='Enter Title' />
                    {titleError && <div className="text-danger">{titleError}</div>}

                    <textarea value={content} onChange={e => setContent(e.target.value)} className='form-control mb-3' placeholder='Enter Content'></textarea>
                    {contentError && <div className="text-danger">{contentError}</div>}
                    
                    <button onClick={handleUpdateNote} className='btn btn-primary'>Update</button>
                </div>
            </div>
        </div>
    )
}

export default EditNote;