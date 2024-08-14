import './App.css';
import Card from './components/Card.jsx'
import React, { useState } from 'react';

function App() {

  const {imgSrc} = useState();

  return (
    <div><Card imgSrc='https://picsum.photos/300/200'/></div>
  );
}

export default App;
