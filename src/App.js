import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import Header from './Header.jsx';
import Home from './home/Home.jsx';


function App() {

  return (
    <div className="App">
      <Header />
      <Home />
    </div>
  );
}

export default App;
