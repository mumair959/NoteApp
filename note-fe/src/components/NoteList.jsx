import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getNotes, deleteNote } from '../noteSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NoteList = () => {
  const notes = useSelector((state) => state.note.notes.data || []);
  const next = useSelector((state) => state.note.notes.next_page_url || null);
  const prev = useSelector((state) => state.note.notes.prev_page_url || null);
  const status = useSelector((state) => state.note.status)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      dispatch(deleteNote(id))
        .then(() => {
          dispatch(getNotes());
          toast.success('Note has been deleted successfully');
        })
        .catch(() => {
          toast.error('Failed to delete note');
        });
    }
  };

  const handlePagination = (url) => {
    dispatch(getNotes(url));
  };

  if (status === 'loading') {
    return (
      <div className='container'>
        <h3>Note List</h3>
        <h4>Loading...</h4>
      </div>
    );
  } else if (status === 'succeeded') {
    return (
      <div className='container'>
        <h3>Note List</h3>
        <Link to="/addNote" className="btn btn-primary mb-3">
          Add New Note
        </Link>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>Title</th>
              <th>Content</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note) => (
              <tr key={note.id}>
                <td>{note.title}</td>
                <td>{note.content}</td>
                <Link to={`/editNote/${note.id}`} className="btn btn-primary mt-2">
                  Edit
                </Link>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(note.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="container d-flex justify-content-center align-items-center">
          <nav>
            <ul className="pagination">
              <li className="page-item">
                <button disabled={prev == null} onClick={() => handlePagination(prev)} className="page-link">
                  Previous
                </button>
              </li>
              <li className="page-item">
                <button disabled={next == null} onClick={() => handlePagination(next)} className="page-link">
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
};

export default NoteList;