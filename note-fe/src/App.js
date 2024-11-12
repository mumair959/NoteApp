import './App.css';
import { Routes,Route } from "react-router-dom";
import NoteList from './components/NoteList';
import AddNote from './components/AddNote';
import EditNote from './components/EditNote';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/' element={ <NoteList/>} />
        <Route path='/addNote' element={ <AddNote/> } />
        <Route path='/editNote/:id' element={ <EditNote/> } />
      </Routes>
    </div>
  );
}

export default App;