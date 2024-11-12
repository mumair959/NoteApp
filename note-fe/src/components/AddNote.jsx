import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNote } from '../noteSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddNote = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [titleError, setTitleError] = useState('');
    const [contentError, setContentError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

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

    const handleAddNote = async() =>{
        if (validateForm()) {
            if (validateForm()) {
                try {
                    const response = await dispatch(addNote({ title, content }));

                    if (response.payload.success == true) {
                        toast.success(response.payload.message);
                        navigate('/');
                    } else {
                        setErrorMessage('Failed to add note. Please try again later.'); // Set error message state
                    }
                } catch (error) {
                    console.error('Error adding note:', error);
                    setErrorMessage('An error occurred while adding the note. Please try again later.'); // Set error message state
                }
            }
        }
    }

    return (
        <div className="App container d-flex justify-content-center align-items-center">
            <div className='card p-4 mt-5 w-100'>
                <h3 className='my-4 text-center'>Add New Notes</h3>
                <div className='mb-4'>
                    <input type='text' value={title} onChange={e => setTitle(e.target.value)} className='form-control mb-3' placeholder='Enter Title' />
                    {titleError && <div className="text-danger">{titleError}</div>}

                    <textarea value={content} onChange={e => setContent(e.target.value)} className='form-control mb-3' placeholder='Enter Content'></textarea>
                    {contentError && <div className="text-danger">{contentError}</div>}
                    
                    {errorMessage && <div className="text-danger">{errorMessage}</div>}
                    <button onClick={handleAddNote} className='btn btn-primary'>Add Note</button>
                </div>
            </div> 
        </div>
    );
}

export default AddNote;