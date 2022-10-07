import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Setting from './pages/Setting';
import Collection from './pages/Collection';
import Cart from './pages/Cart';
import Test from './pages/Test';

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
        <Route path='/test' element={<Test />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
