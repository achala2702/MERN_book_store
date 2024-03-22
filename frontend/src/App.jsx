import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './webPages/Home.jsx';
import CreateBook from './webPages/CreateBook.jsx';
import DeleteBook from './webPages/DeleteBook.jsx';
import EditBook from './webPages/EditBook.jsx';
import ShowBook from './webPages/ShowBook.jsx';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/books/create' element={<CreateBook/>}/>
      <Route path='/books/details/:id' element={<ShowBook/>}/>
      <Route path='/books/edit/:id' element={<EditBook/>}/>
      <Route path='/books/delete/:id' element={<DeleteBook/>}/>
    </Routes>
  )
}

export default App