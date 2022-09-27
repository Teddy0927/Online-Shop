import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import './App.css';
import Home from './Components/Home';
import NotFound from './Components/NotFound';
import Setting from './Components/Setting';
import Collection from './Components/Collection';
import Cart from './Components/Cart';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/setting' element={<Setting />}></Route>
        <Route path='/collection' element={<Collection />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
